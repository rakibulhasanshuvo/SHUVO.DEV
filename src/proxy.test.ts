/**
 * @jest-environment node
 */

process.env.NEXT_PUBLIC_SUPABASE_URL = "https://mock.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key";
process.env.AUTHORIZED_ADMIN_EMAILS = "admin@shuvo.dev";
process.env.DISABLE_PUBLIC_SIGNUP = "true";

const mockGetUser = jest.fn();
jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(() => ({
    auth: {
      getUser: () => Promise.resolve(mockGetUser()),
    },
  })),
}));

jest.mock("next/server", () => {
  const actual = jest.requireActual("next/server");
  return {
    ...actual,
    userAgent: () => ({ device: { type: "desktop" } }),
  };
});

import { proxy } from "./proxy";
import { NextRequest } from "next/server";

describe("Edge Middleware - Admin Lockdown", () => {
  beforeEach(() => {
    mockGetUser.mockReset();
  });

  it("should block /signup in production when DISABLE_PUBLIC_SIGNUP is true", async () => {
    const request = new NextRequest("http://localhost/signup");
    const response = await proxy(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/");
  });

  it("should block unauthorized users from /dashboard and clear cookies", async () => {
    mockGetUser.mockReturnValue({
      data: { user: { email: "unauthorized@gmail.com" } },
    });

    const request = new NextRequest("http://localhost/dashboard");
    request.cookies.set("sb-access-token", "some-token");

    const response = await proxy(request);

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/");
    
    // Confirms it deletes sb- cookies
    const setCookie = response.headers.get("set-cookie") || "";
    expect(setCookie).toContain("sb-access-token=;");
  });

  it("should allow authorized admin users to access /dashboard", async () => {
    mockGetUser.mockReturnValue({
      data: { user: { email: "admin@shuvo.dev" } },
    });

    const request = new NextRequest("http://localhost/dashboard");
    const response = await proxy(request);

    // Should proceed to NextResponse.next() without redirection
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
