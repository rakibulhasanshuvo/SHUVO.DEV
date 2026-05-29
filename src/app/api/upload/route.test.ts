/**
 * @jest-environment node
 */

process.env.CLOUDINARY_API_KEY = "mock-cloudinary-api-key";
process.env.CLOUDINARY_API_SECRET = "mock-cloudinary-api-secret-123456789";
process.env.CLOUDINARY_CLOUD_NAME = "mock-cloud-name";
process.env.AUTHORIZED_ADMIN_EMAILS = "admin1@gmail.com,admin2@gmail.com";

const mockGetUser = jest.fn();

jest.mock("@/lib/supabase/server", () => ({
  createServerSupabaseClient: jest.fn(() => Promise.resolve({
    auth: {
      getUser: () => Promise.resolve(mockGetUser()),
    },
  })),
}));

import { POST } from "./route";

describe("Upload API Signature Generator", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockGetUser.mockReset();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should reject unauthenticated request with 401", async () => {
    mockGetUser.mockReturnValue({ data: { user: null } });

    const response = await POST(new Request("http://localhost/api/upload", { method: "POST" }));
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should reject non-admin authenticated users with 401", async () => {
    mockGetUser.mockReturnValue({
      data: {
        user: { email: "attacker@gmail.com" },
      },
    });

    const response = await POST(new Request("http://localhost/api/upload", { method: "POST" }));
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });

  it("should generate signed params and signature for authorized admins", async () => {
    mockGetUser.mockReturnValue({
      data: {
        user: { email: "admin2@gmail.com" },
      },
    });

    const response = await POST(new Request("http://localhost/api/upload", { method: "POST" }));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.apiKey).toBe("mock-cloudinary-api-key");
    expect(data.cloudName).toBe("mock-cloud-name");
    expect(data.folder).toBe("shuvo-dev-admin");
    expect(data.uploadPreset).toBe("ml_default");
    expect(data.signature).toBeDefined();
    expect(data.timestamp).toBeDefined();
  });
});
