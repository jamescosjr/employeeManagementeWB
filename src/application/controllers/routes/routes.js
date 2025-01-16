import {
  createEmployeeHandler,
  getEmployeesHandler,
  getEmployeesByNameHandler,
  getEmployeesByDepartmentHandler,
  getEmployeesByPositionHandler,
  getEmployeesBySalaryHandler,
  deleteEmployeeHandler,
  updateEmployeeHandler,
} from "../employeeController";
import { Router } from "express";

const router = Router();

router.post("/employees", createEmployeeHandler);
router.get("/employees", getEmployeesHandler);
router.get("/employees/name/:name", getEmployeesByNameHandler);
router.get("/employees/department/:department", getEmployeesByDepartmentHandler);
router.get("/employees/position/:position", getEmployeesByPositionHandler);
router.get("/employees/salary/:salary", getEmployeesBySalaryHandler,);
router.delete("/employees/:id", deleteEmployeeHandler);
router.put("/employees/:id", updateEmployeeHandler);

export default router;