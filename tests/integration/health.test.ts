import httpStatus from "http-status";
import supertest from "supertest";
import app from "../../src/app";

const api = supertest(app);

describe("Health Integration Tests", () => {
  describe("GET /health", () => {
    it("should respond with status 200 and with OK! text", async () => {
      const { status, text } = await api.get("/health");
      expect(status).toBe(httpStatus.OK);
      expect(text).toBe("OK!");
    });
  });
});
