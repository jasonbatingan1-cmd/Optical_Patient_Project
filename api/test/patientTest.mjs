import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Patients API", () => {
    it("should return all patients", async () => {
        const res = await request(app).get("/patients");

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
    });
});
