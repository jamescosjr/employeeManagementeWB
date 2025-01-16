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

describe("GET /employees/salary/:salary", () => {
    describe("success cases", () => {
        it("should return 200 when getting a employee by salary", async () => {
            const employee = new Employee({
                name: "employee 1",
                position: "Category 1",
                department: "Department 1",
                salary: 10
            });
            await employee.save();

            const response = await supertest(app).get(`/employees/salary/10`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([{
                name: "employee 1",
                position: "Category 1",
                department: "Department 1",
                salary: 10,
                _id: expect.any(String),
                __v: 0
            }]);
        });
        it("should return 200 and an empty array when there is no employee with the salary", async () => {
            const response = await supertest(app).get(`/employees/salary/10`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
    describe("non success cases", () => {
        it("should return 500 when database error", async () => {
            jest.spyOn(Employee, 'find').mockImplementationOnce(() => {
                throw new Error();
            });

            const response = await supertest(app).get(`/employees/salary/10`);

            expect(response.status).toBe(500);
        });
    });
});