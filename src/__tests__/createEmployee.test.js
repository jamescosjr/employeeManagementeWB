import supertest from "supertest";
import { Employee } from "../infrastructure/schemas/employeeSchema";
import { app } from "../../server";
import { AppError, ValidationError } from "../domain/error/customErros";
const dbHandler = require('../../jest/jest.setup');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('POST /employees', () => {
    describe("success cases", () => {
        it("should return 201 when creating a employee", async () => {
            const employee = {
                name: "employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10
            };

            const response = await supertest(app).post("/employees").send(employee);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining({
                _id: expect.any(String),
                name: "employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10,
                __v:0,
            }));
        });
    });

    describe("non succes cases", () => {
        it("should return 400 when name is not provided", async () => {
            const employee = {
                position: "position 1",
                department: "10",
                salary: 10
            };

            const response = await supertest(app).post("/employees").send(employee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The name should be a valid string",
            });
        });
        it("should return 400 when position is not provided", async () => {
            const employee = {
                name: "employee 1",
                department: 10,
                salary: 10
            };

            const response = await supertest(app).post("/employees").send(employee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The position should be a valid string",
            });
        });
        it("should return 400 when department is not provided", async () => {
            const employee = {
                name: "employee 1",
                position: "position 1",
                salary: 10
            };

            const response = await supertest(app).post("/employees").send(employee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The department should be a valid number",
            });
        });
        it("should return 400 when salary is not provided", async () => {
            const employee = {
                name: "employee 1",
                position: "position 1",
                department: "department 1"
            };

            const response = await supertest(app).post("/employees").send(employee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The salary should be a valid number",
            });
        });
        it("should return 500", async () => {
            jest.spyOn(Employee.prototype, 'save').mockImplementationOnce(() => {
                throw new AppError("Database error");
            });
            const response = await supertest(app).post("/employees").send({
                name: "employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10
            });

            expect(response.status).toBe(500);
            expect(response.body).toMatchObject({
                message: "Database error",
            });
        });
    });
});
