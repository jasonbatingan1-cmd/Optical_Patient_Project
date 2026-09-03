import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import Patient from "../models/Patient.js";
import { connectTestDB, clearTestDB, closeTestDB } from "./setup.mjs";
import { generateToken, validPatient } from "./helpers.mjs";

describe("Patient routes", () => {
    before(async () => {
        await connectTestDB();
    });

    afterEach(async () => {
        await clearTestDB();
    });

    after(async () => {
        await closeTestDB();
    });

    const adminToken = generateToken("admin");
    const opticianToken = generateToken("optician");
    const unknownRoleToken = generateToken("frontdesk"); // role not in allowedRoles

    describe("POST /patients", () => {
        it("creates a patient with valid data (admin)", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", `Bearer ${adminToken}`)
                .send(validPatient);

            expect(res.status).to.equal(201);
            expect(res.body).to.include({ firstName: "Jane", lastName: "Doe" });
            expect(res.body).to.have.property("_id");
        });

        it("creates a patient with valid data (optician)", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", `Bearer ${opticianToken}`)
                .send(validPatient);

            expect(res.status).to.equal(201);
        });

        it("rejects a patient missing required fields", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ firstName: "OnlyFirstName" });

            expect(res.status).to.equal(400);
        });

        it("rejects an invalid email format", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ ...validPatient, email: "not-an-email" });

            expect(res.status).to.equal(400);
        });

        it("rejects an invalid phone format", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ ...validPatient, phone: "abc" });

            expect(res.status).to.equal(400);
        });

        it("rejects requests with no token", async () => {
            const res = await request(app)
                .post("/patients")
                .send(validPatient);

            expect(res.status).to.equal(401);
        });

        it("rejects requests with a malformed token", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", "Bearer not-a-real-token")
                .send(validPatient);

            expect(res.status).to.equal(401);
        });

        it("rejects a role not permitted to create patients", async () => {
            const res = await request(app)
                .post("/patients")
                .set("Authorization", `Bearer ${unknownRoleToken}`)
                .send(validPatient);

            expect(res.status).to.equal(403);
        });
    });

    describe("GET /patients", () => {
        it("returns an empty array when no patients exist", async () => {
            const res = await request(app)
                .get("/patients")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array").that.is.empty;
        });

        it("returns all patients", async () => {
            await Patient.create(validPatient);
            await Patient.create({ ...validPatient, email: "second@example.com" });

            const res = await request(app)
                .get("/patients")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(2);
        });
    });

    describe("GET /patients/:id", () => {
        it("returns a single patient by id", async () => {
            const created = await Patient.create(validPatient);

            const res = await request(app)
                .get(`/patients/${created._id}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(200);
            expect(res.body._id).to.equal(created._id.toString());
        });

        it("returns 404 for a well-formed but non-existent id", async () => {
            const fakeId = "64b7f9f9f9f9f9f9f9f9f9f9";

            const res = await request(app)
                .get(`/patients/${fakeId}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(404);
        });

        it("returns 400 for a malformed id", async () => {
            const res = await request(app)
                .get("/patients/not-a-valid-id")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(400);
        });
    });

    describe("PUT /patients/:id", () => {
        it("updates a patient with valid data", async () => {
            const created = await Patient.create(validPatient);

            const res = await request(app)
                .put(`/patients/${created._id}`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ notes: "Updated notes" });

            expect(res.status).to.equal(200);
            expect(res.body.notes).to.equal("Updated notes");
        });

        it("rejects an update with invalid data (runValidators check)", async () => {
            const created = await Patient.create(validPatient);

            const res = await request(app)
                .put(`/patients/${created._id}`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ email: "still-not-an-email" });

            expect(res.status).to.equal(400);
        });

        it("returns 404 when updating a non-existent patient", async () => {
            const fakeId = "64b7f9f9f9f9f9f9f9f9f9f9";

            const res = await request(app)
                .put(`/patients/${fakeId}`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ notes: "won't apply" });

            expect(res.status).to.equal(404);
        });

        it("rejects update from a disallowed role", async () => {
            const created = await Patient.create(validPatient);

            const res = await request(app)
                .put(`/patients/${created._id}`)
                .set("Authorization", `Bearer ${unknownRoleToken}`)
                .send({ notes: "nope" });

            expect(res.status).to.equal(403);
        });
    });

    describe("DELETE /patients/:id", () => {
        it("deletes an existing patient", async () => {
            const created = await Patient.create(validPatient);

            const res = await request(app)
                .delete(`/patients/${created._id}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(200);
            expect(res.body.success).to.be.true;

            const stillThere = await Patient.findById(created._id);
            expect(stillThere).to.be.null;
        });

        it("returns 404 when deleting a non-existent patient", async () => {
            const fakeId = "64b7f9f9f9f9f9f9f9f9f9f9";

            const res = await request(app)
                .delete(`/patients/${fakeId}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).to.equal(404);
        });

        it("rejects delete from a disallowed role", async () => {
            const created = await Patient.create(validPatient);

            const res = await request(app)
                .delete(`/patients/${created._id}`)
                .set("Authorization", `Bearer ${unknownRoleToken}`);

            expect(res.status).to.equal(403);
        });
    });
});