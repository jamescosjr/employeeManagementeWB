/* eslint-disable no-undef */
import {
  registerEmployeeHandler,
  listEmployeesHandler,
  findEmployeeByNameHandler,
  listEmployeesByPositionHandler,
  listEmployeesByDepartmentHandler,
  listEmployeesBySalaryHandler,
  deleteEmployeeHandler,
  updateEmployeeHandler,
} from "../../controllers/employeeController.js";
import * as employeeRepository from "../../repository/employeeRepository.js";

const logSpy = jest.spyOn(console, "log").mockImplementation();
const errorSpy = jest.spyOn(console, "error").mockImplementation();

describe("EMployee Handlers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 201 when registering an employee", async () => {
    const mockEmployee = {
      name: "Test name",
      department: "Test department",
      salary: 2022,
      position: "Test position",
    };
    jest.spyOn(employeeRepository, "register").mockResolvedValue(mockEmployee);

    const req = { body: mockEmployee };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockEmployee);
  });

  it("should return a 400 status when the data is not valid", () => {
    const mockEmployeeNotValid = {
      name: "Test name",
      department: "Test department",
      salary: "-2025",
      position: "Test position",
    };
    jest.spyOn(employeeRepository, "register").mockReturnValue(null);

    const req = { body: mockEmployeeNotValid };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    registerEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid employee data" });
  });
  it("should return a 500 status when an error occurs", async () => {
    const mockEmployee = {
      name: "Test name",
      department: "Test department",
      salary: 2022,
      position: "Test position",
    };
    jest
      .spyOn(employeeRepository, "register")
      .mockRejectedValue(new Error("Error registering employee"));

    const req = { body: mockEmployee };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error registering employee",
      error: "Error registering employee",
    });
  });

  it("should return a 200 when list all employee", () => {
    const mockEmployees = [
      {
        name: "Test name",
        department: "Test department",
        salary: 2022,
        position: "Test position",
      },
    ];
    jest.spyOn(employeeRepository, "findAll").mockReturnValue(mockEmployees);

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesHandler({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });
  it("should return a 500 status when an error occurs", () => {
    jest.spyOn(employeeRepository, "findAll").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesHandler({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return a 200 when find a employee by name", () => {
    const mockEmployee = {
      name: "Test name",
      department: "Test department",
      salary: 2022,
      position: "Test position",
    };
    jest.spyOn(employeeRepository, "findByName").mockReturnValue(mockEmployee);

    const req = { params: { name: "Test name" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    findEmployeeByNameHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployee);
  });

  it("should return a 404 status if employee is not found", () => {
    const mockEmployee = null;
    jest.spyOn(employeeRepository, "findByName").mockReturnValue(mockEmployee);

    const req = { params: { name: "Test name" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    findEmployeeByNameHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });
  });

  it("should return a 500 status when an error occurs", () => {
    jest.spyOn(employeeRepository, "findByName").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const req = { params: { name: "Test name" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    findEmployeeByNameHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return a 200 and list employee by position", () => {
    const mockEmployees = [
      {
        name: "Test name",
        department: "Test department",
        salary: 2022,
        position: "Test position",
      },
    ];
    jest
      .spyOn(employeeRepository, "listByPosition")
      .mockReturnValue(mockEmployees);

    const req = { params: { position: "Test position" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesByPositionHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });

  it("should return a 404 status if employees are not found by position", () => {
    const mockEmployees = null;
    jest
      .spyOn(employeeRepository, "listByPosition")
      .mockReturnValue(mockEmployees);

    const req = { params: { position: "Test position" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesByPositionHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employees not found" });
  });

  it("should return a 500 status when an error occurs", () => {
    jest.spyOn(employeeRepository, "listByPosition").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });
  });

  it("should return a 200 and list employees by department", () => {
    const mockEmployees = [
      {
        name: "Test name",
        department: "Test department",
        salary: 2022,
        position: "Test position",
      },
    ];
    jest
      .spyOn(employeeRepository, "listByDepartment")
      .mockReturnValue(mockEmployees);

    const req = { params: { department: "Test department" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesByDepartmentHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });

  it("should return a 404 status if employees are not found by department", () => {
    const mockEmployees = null;
    jest
      .spyOn(employeeRepository, "listByDepartment")
      .mockReturnValue(mockEmployees);

    const req = { params: { department: "Test department" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesByDepartmentHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employees not found" });
  });

  it("should return a 500 status when an error occurs", () => {
    jest
      .spyOn(employeeRepository, "listByDepartment")
      .mockImplementation(() => {
        throw new Error("Internal Server Error");
      });
  });

  it("should return a 200 and list employees by salary", () => {
    const mockEmployees = [
      {
        name: "Test name",
        department: "Test department",
        salary: 2022,
        position: "Test position",
      },
    ];
    jest
      .spyOn(employeeRepository, "listBySalary")
      .mockReturnValue(mockEmployees);

    const req = { params: { salary: 2022 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesBySalaryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployees);
  });

  it("should return a 404 status if employees are not found by salary", () => {
    const mockEmployees = null;
    jest
      .spyOn(employeeRepository, "listBySalary")
      .mockReturnValue(mockEmployees);

    const req = { params: { salary: 2022 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    listEmployeesBySalaryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employees not found" });
  });

  it("should return a 500 status when an error occurs", () => {
    jest.spyOn(employeeRepository, "listBySalary").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });
  });

  it("should return a 200 and vdelete a employee by id", () => {
    const mockEmployee = {
      name: "Test name",
      department: "Test department",
      salary: 2022,
      position: "Test position",
      id: 1,
    };
    jest.spyOn(employeeRepository, "deleteById").mockReturnValue(mockEmployee);

    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    deleteEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployee);
  });

  it("should return a 404 if employee to delete is not found", () => {
    const mockEmployee = null;
    jest.spyOn(employeeRepository, "deleteById").mockReturnValue(mockEmployee);

    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    deleteEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });
  });

  it("should return a 500 when deleting a employee fails", () => {
    jest.spyOn(employeeRepository, "deleteById").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    deleteEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should return a 200 when update a employee by id", () => {
    const mockEmployee = {
      name: "Test name",
      department: "Test department",
      salary: 2022,
      position: "Test position",
    };
    jest.spyOn(employeeRepository, "updateById").mockReturnValue(mockEmployee);

    const req = { params: { id: 1 }, body: mockEmployee };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    updateEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockEmployee);
  });

  it("should return a 404 if employee to update is not found", () => {
    const mockEmployee = null;
    jest.spyOn(employeeRepository, "updateById").mockReturnValue(mockEmployee);

    const req = { params: { id: 1 }, body: mockEmployee };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    updateEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Employee not found" });
  });

  it("should return a 500 when updating a employee fails", () => {
    jest.spyOn(employeeRepository, "updateById").mockImplementation(() => {
      throw new Error("Internal Server Error");
    });

    const req = { params: { id: 1 }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    updateEmployeeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
