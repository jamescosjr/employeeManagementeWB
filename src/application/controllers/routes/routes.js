import {
  registerEmployeeHandler,
  listEmployeesHandler,
  findEmployeeByNameHandler,
  listEmployeesByDepartmentHandler,
  listEmployeesByPositionHandler,
  listEmployeesBySalaryHandler,
  deleteEmployeeHandler,
  updateEmployeeHandler,
} from "../employeeController.js";
import { Router } from "express";

const router = Router();

router.post("/employees", registerEmployeeHandler);
router.get("/employees", listEmployeesHandler);
router.get("/employees/:name", findEmployeeByNameHandler);
router.get("/employees/department/:department", listEmployeesByDepartmentHandler);
router.get("/employees/position/:position", listEmployeesByPositionHandler);
router.get("/employees/salary/:salary", listEmployeesBySalaryHandler);
router.delete("/employees/:id", deleteEmployeeHandler);
router.put("/employees/:id", updateEmployeeHandler);

export default router;