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

describe("DELETE /employees/:id", () => {
    describe("success cases", () => {
        it("should return 204 when deleting a employee", async () => {
            const employee = new Employee({
                name: "employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            const response = await supertest(app).delete(`/employees/${databaseEmployee._id}`);

            expect(response.status).toBe(204);
        });
    });
    describe("non success cases", () => {
        it("should return 404 when employee not found", async () => {
            const response = await supertest(app).delete(`/employees/677aa30f88a6da644245cae7`);

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'employee not found' });
        });
        it("should return 500 when database error", async () => {
            const employee = new Employee({
                name: "employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10
            });
            const databaseemployee = await employee.save();

            jest.spyOn(Employee, 'findByIdAndDelete').mockImplementationOnce(() => {
                throw new Error();
            });

            const response = await supertest(app).delete(`/employees/${databaseemployee._id}`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });
});