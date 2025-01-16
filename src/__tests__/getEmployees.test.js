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

describe("GET /employees", () => {
    describe("success cases", () => {
        it("should return 200 when getting all employees", async () => {
            const employee = new Employee({
                name: "employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10
            });
            await employee.save();

            const response = await supertest(app).get(`/employees`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "employee 1",
                        position: "position 1",
                        department: "department 1",
                        salary: 10
                    })
                ])
            );
        });
        it("should return 200 when getting all employees with empty array", async () => {
            const response = await supertest(app).get(`/employees`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
    describe("non success cases", () => {
        it("should return 500 when database error", async () => {
            jest.spyOn(Employee, 'find').mockImplementationOnce(() => {
                throw new Error();
            });

            const response = await supertest(app).get(`/employees`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error getting the Employees' });
        });
    });
});