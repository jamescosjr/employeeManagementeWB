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

describe("PUT /employees/:id", () => {
    describe("succes cases", () => {
        it("should return 200 when updating a Employee", async () => {
            const employee = new Employee({
                name: "Employee 1",
                position: "position 1",
                department: "department 1",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            const updatedEmployee = {
                name: "Employee 2",
                position: "position 2",
                department: "20",
                salary: 20
            };

            const response = await supertest(app).put(`/employees/${databaseEmployee._id}`).send(updatedEmployee);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining(updatedEmployee));
        });
    });
    describe("non success cases", () => {
        it("should return 400 when name is not provided", async () => {
            const employee = new Employee({
                name: "employee 1",
                position: "position 1",
                department: "10",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            const updatedEmployee = {
                position: "position 2",
                department: "20",
                salary: 20
            };

            const response = await supertest(app).put(`/Employees/${databaseEmployee._id}`).send(updatedEmployee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The name should be a valid string",
            });
        });
        it("should return 400 when position is not provided", async () => {
            const employee = new Employee({
                name: "Employee 1",
                position: "position 1",
                department: "10",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            const updatedEmployee = {
                name: "Employee 2",
                department: "20",
                salary: 20
            };

            const response = await supertest(app).put(`/Employees/${databaseEmployee._id}`).send(updatedEmployee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The position should be a valid string",
            });
        });
        it("should return 400 when department is not provided", async () => {
            const employee = new Employee({
                name: "Employee 1",
                position: "position 1",
                department: "10",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            const updatedEmployee = {
                name: "Employee 2",
                position: "position 2",
                salary: 20
            };

            const response = await supertest(app).put(`/Employees/${databaseEmployee._id}`).send(updatedEmployee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The department should be a valid number",
            });
        });
        it("should return 400 when salary is not provided", async () => {
            const employee = new Employee({
                name: "Employee 1",
                position: "position 1",
                department: "10",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            const updatedEmployee = {
                name: "Employee 2",
                position: "position 2",
                department: "20"
            };

            const response = await supertest(app).put(`/Employees/${databaseEmployee._id}`).send(updatedEmployee);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The salary should be a valid number",
            });
        });
        it("should return 404 when the Employee is not found", async () => {
            const updatedEmployee = {
                name: "Employee 2",
                position: "position 2",
                department: "20",
                salary: 20
            };

            const response = await supertest(app).put(`/employees/677aa30f88a6da644245cae7`).send(updatedEmployee);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({
                message: "employee not found",
            });
        });
        it("should return 500 when there is an error in the repository", async () => {
            const employee = new Employee({
                name: "Employee 1",
                position: "position 1",
                department: "10",
                salary: 10
            });
            const databaseEmployee = await employee.save();

            jest.spyOn(Employee, 'findByIdAndUpdate').mockImplementationOnce(async () => {
                throw new AppError("Database error");
            });

            const updatedEmployee = {
                name: "Employee 2",
                position: "position 2",
                department: "20",
                salary: 20
            };

            const response = await supertest(app).put(`/Employees/${databaseEmployee._id}`).send(updatedEmployee);

            expect(response.status).toBe(500);
            expect(response.body).toMatchObject({
                message: "Database error",
            });
        });
    })
});