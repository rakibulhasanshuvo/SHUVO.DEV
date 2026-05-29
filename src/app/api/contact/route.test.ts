/**
 * @jest-environment node
 */

// 1. Mock dependencies and environment variables BEFORE importing route
process.env.RESEND_API_KEY = "re_mock_123";
process.env.RATE_LIMIT_SECRET = "test-rate-limit-secret-key-12345";

const mockInsert = jest.fn().mockResolvedValue({ error: null });
const mockFrom = jest.fn().mockReturnValue({ insert: mockInsert });

jest.mock("@/lib/supabase/admin", () => ({
  createAdminSupabaseClient: jest.fn(() => ({
    from: (table: string) => mockFrom(table),
  })),
}));

const mockCookieStore = {
  get: jest.fn(),
  set: jest.fn(),
};

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => Promise.resolve(mockCookieStore)),
  headers: jest.fn(() => Promise.resolve({
    get: jest.fn((header) => {
      if (header === "Stripe-Signature") return "mock-stripe-signature";
      return null;
    }),
  })),
}));

import { POST } from "./route";

describe("Contact API - Hardened Features", () => {
  let consoleSpy: jest.SpyInstance;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    mockInsert.mockClear();
    mockFrom.mockClear();
    mockCookieStore.get.mockReset();
    mockCookieStore.set.mockReset();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    logSpy.mockRestore();
  });

  it("should return a silent success response if honeypot field is filled", async () => {
    const mockRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "1.1.1.1",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message.",
        website_url: "http://spam.com", // honeypot field
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      success: true,
      message: "Message processed successfully. Secure thread opened.",
      status: "silent_dropped",
    });
    expect(logSpy).toHaveBeenCalledWith("Honeypot triggered! Bot submission rejected silently.");
  });

  it("should reject payloads larger than 10KB", async () => {
    const hugeMessage = "A".repeat(11000);
    const mockRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-length": "11500",
        "x-real-ip": "2.2.2.2",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: hugeMessage,
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(413);
    expect(data.success).toBe(false);
    expect(data.error).toContain("payload too large");
  });

  it("should reject disposable email addresses", async () => {
    const mockRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "3.3.3.3",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "spammer@mailinator.com",
        message: "This is a test message from mailinator.",
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain("Please use a permanent email address");
  });

  it("should sanitize HTML tags from fields before database insertion", async () => {
    mockCookieStore.get.mockReturnValue(undefined); // No cookies initially

    const mockRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "4.4.4.4",
      },
      body: JSON.stringify({
        name: "<b>Bold User</b>",
        email: "test@example.com",
        message: "<script>alert('xss')</script>Hello there!",
      }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);

    expect(mockInsert).toHaveBeenCalledTimes(1);
    expect(mockInsert).toHaveBeenCalledWith({
      name: "Bold User",
      email: "test@example.com",
      message: "alert('xss')Hello there!",
      subject: "Direct Contact Form Submission",
      service_tier: "conversion",
      estimated_budget: 0,
      status: "new",
    });
  });

  it("should enforce cookie-based rate limiting", async () => {
    // 1. First request is fine, it sets the cookie
    mockCookieStore.get.mockReturnValue(undefined); // No cookie yet

    const mockRequest1 = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "5.5.5.1",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is message number one.",
      }),
    });

    const response1 = await POST(mockRequest1);
    expect(response1.status).toBe(200);

    // Get the set-cookie header or response cookies
    const cookieHeader = response1.headers.get("set-cookie") || "";
    expect(cookieHeader).toContain("rate-limit-tracker=");

    // Parse the cookie value
    const match = cookieHeader.match(/rate-limit-tracker=([^;]+)/);
    const cookieValue = match ? decodeURIComponent(match[1]) : "";

    // 2. Set the cookie in our mock cookie store for subsequent requests
    mockCookieStore.get.mockReturnValue({ value: cookieValue });

    // Send 2nd request
    const response2 = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "5.5.5.2",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is message number two.",
      }),
    }));
    expect(response2.status).toBe(200);

    // Extract updated cookie
    const match2 = response2.headers.get("set-cookie")?.match(/rate-limit-tracker=([^;]+)/);
    const cookieValue2 = match2 ? decodeURIComponent(match2[1]) : "";
    mockCookieStore.get.mockReturnValue({ value: cookieValue2 });

    // Send 3rd request (should also succeed since limit is 3)
    const response3 = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "5.5.5.3",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is message number three.",
      }),
    }));
    expect(response3.status).toBe(200);

    // Extract updated cookie
    const match3 = response3.headers.get("set-cookie")?.match(/rate-limit-tracker=([^;]+)/);
    const cookieValue3 = match3 ? decodeURIComponent(match3[1]) : "";
    mockCookieStore.get.mockReturnValue({ value: cookieValue3 });

    // Send 4th request (should be rejected with 429!)
    const response4 = await POST(new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "x-real-ip": "5.5.5.4",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is message number four.",
      }),
    }));
    expect(response4.status).toBe(429);
    const data4 = await response4.json();
    expect(data4.error).toContain("Too many requests");
  });
});
