/**
 * @jest-environment node
 */
import { POST } from "./route";

describe("Contact API - Honeypot", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Suppress console.warn during this test block
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should return a silent success response if honeypot field is filled", async () => {
    const mockRequest = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message.",
        confirm_corporate_website: "http://spam.com", // honeypot field
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
    expect(consoleSpy).toHaveBeenCalledWith("Honeypot triggered! Bot submission rejected silently.");
  });
});
