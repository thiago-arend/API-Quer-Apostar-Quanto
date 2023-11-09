import app from "../../src/app";
import httpStatus from "http-status";
import supertest from "supertest";

const api = supertest(app);

describe("GET /health", () => {
    it("should respond with status 200 and with OK! text", async () => {
        const { status, text } = await api.get("/health");
        expect(status).toBe(httpStatus.OK);
        expect(text).toBe("OK!");
    });
});