/* eslint-disable no-undef */
import request from "supertest";
import app from "../../../server.js";
import { employees } from "../../repository/employeeRepository.js";

describe("Integration tests for routes", () => {
  beforeEach(() => {
    jest.resetModules();
    employees.splice(0, employees.length);
  });
  it("should test all the proccess of registering an employee", async () => {
    const employee = {
      name: "John Doe",
      department: "Engineering",
      position: "Software Developer",
      salary: 5000,
    };

    const response = await request(app).post("/employees").send(employee);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(employee));
  });

  it("should test the process of listing all employees", async () => {
    const response = await request(app).get("/employees");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should test the process of listing employees by department", async () => {
    const employee = {
      name: "John Doe",
      department: "Engineering",
      position: "Software Developer",
      salary: 5000,
    };

    await request(app)
        .post("/employees")
    
        .send(employee);

    const response = await request(app).get(
      "/employees/department/Engineering"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should test the process of listing employees by position", async () => {
    const employee = {
      name: "John Doe",
      department: "Engineering",
      position: "Software Developer",
      salary: 5000,
    };

    await request(app)
        .post("/employees")
    
        .send(employee);

    const response = await request(app).get(
      "/employees/position/Software Developer"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([]));
  });

  it("should test the process of finding an employee by name", async () => {
    const employee = {
      name: "John Doe",
      department: "Engineering",
      position: "Software Developer",
      salary: 5000,
    };

    await request(app)
      .post("/employees")

      .send(employee);

    const response = await request(app).get("/employees/John Doe");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

    it("should test the process of trying to find an employee that does not exist", async () => {
        const response = await request(app).get("/employees/John Doe");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to list employees by department that does not exist", async () => {
        const response = await request(app).get("/employees/department/NonExistentDepartment");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to list employees by position that does not exist", async () => {
        const response = await request(app).get("/employees/position/NonExistentPosition");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to delete an employee that does not exist", async () => {
        const response = await request(app).delete("/employees/1");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to update an employee that does not exist", async () => {
        const response = await request(app).put("/employees/1");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to register an employee with invalid data", async () => {
        const employee = {
            name: "John Doe",
            department: "Engineering",
            position: "Software Developer",
        };
    
        const response = await request(app).post("/employees").send(employee);
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to update an employee with invalid data", async () => {
        const employee = {
            name: "John Doe",
            department: "Engineering",
            position: "Software Developer",
        };
    
        const response = await request(app).put("/employees/1").send(employee);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to list employees by department with invalid data", async () => {
        const response = await request(app).get("/employees/department/");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it("should test the process of trying to list employees by position with invalid data", async () => {
        const response = await request(app).get("/employees/position/");
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual(expect.objectContaining({}));
    });

    it('should test the process of deleting an employee', async () => {
        const employee = {
            name: "John Doe",
            department: "Engineering",
            position: "Software Developer",
            salary: 5000,
        };
    
        const registerResponse = await request(app).post("/employees").send(employee);
        const deleteResponse = await request(app).delete(`/employees/${registerResponse.body.id}`);
    
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toEqual(expect.objectContaining({}));
    });

    it('should test the process of updating an employee', async () => {
        const employee = {
            name: "John Doe",
            department: "Engineering",
            position: "Software Developer",
            salary: 5000,
        };
    
        const registerResponse = await request(app).post("/employees").send(employee);
        const updateResponse = await request(app).put(`/employees/${registerResponse.body.id}`).send({ name: "Jane Doe" });
    
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body).toEqual(expect.objectContaining({
            id: registerResponse.body.id,
            name: "Jane Doe",
            department: "Engineering",
            position: "Software Developer",
            salary: 5000,
        }));
    });
});
