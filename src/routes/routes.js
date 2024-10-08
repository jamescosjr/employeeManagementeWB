import express from "express";
import {
  registerEmployeeHandler,
  listEmployeesHandler,
  findEmployeeByNameHandler,
  listEmployeesByDepartmentHandler,
  listEmployeesByPositionHandler,
} from "../controllers/employeeController.js";

const app = express();
app.use(express.json());

app.post("/employees", registerEmployeeHandler);
app.get("/employees", listEmployeesHandler);
app.get("/employees/:name", findEmployeeByNameHandler);
app.get("/employees/department/:department", listEmployeesByDepartmentHandler);
app.get("/employees/position/:position", listEmployeesByPositionHandler);

export default app;
