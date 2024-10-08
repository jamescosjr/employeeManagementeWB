import express from "express";
import {
  registerEmployeeHandler,
  listEmployeesHandler,
  findEmployeeByNameHandler,
  listEmployeesByDepartmentHandler,
  listEmployeesByPositionHandler,
  listEmployeesBySalaryHandler,
  deleteEmployeeHandler,
  updateEmployeeHandler,
} from "../controllers/employeeController.js";

const app = express();
app.use(express.json());

app.post("/employees", registerEmployeeHandler);
app.get("/employees", listEmployeesHandler);
app.get("/employees/:name", findEmployeeByNameHandler);
app.get("/employees/department/:department", listEmployeesByDepartmentHandler);
app.get("/employees/position/:position", listEmployeesByPositionHandler);
app.get("/employees/salary/:salary", listEmployeesBySalaryHandler);
app.delete("/employees/:id", deleteEmployeeHandler);
app.put("/employees/:id", updateEmployeeHandler);

export default app;
