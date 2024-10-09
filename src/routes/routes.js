import app from "../../server.js";
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

app.post("/employees", registerEmployeeHandler);
app.get("/employees", listEmployeesHandler);
app.get("/employees/:name", findEmployeeByNameHandler);
app.get("/employees/department/:department", listEmployeesByDepartmentHandler);
app.get("/employees/position/:position", listEmployeesByPositionHandler);
app.get("/employees/salary/:salary", listEmployeesBySalaryHandler);
app.delete("/employees/:id", deleteEmployeeHandler);
app.put("/employees/:id", updateEmployeeHandler);
