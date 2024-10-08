import {
  register,
  findAll,
  findByName,
  listByDepartment,
  listByPosition,
  listBySalary,
  deleteById,
  updateById,
} from "../repository/employeeRepository.js";
import { validateEmployeeData } from "../utils/validation.js";

export async function registerEmployeeHandler(req, res) {
  const employee = req.body;
  const isValid = validateEmployeeData(employee);

  if (!isValid) {
    return res.status(400).json({ message: "Invalid employee data" });
  }

  try {
    const newEmployee = await register(employee);
    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering employee", error: error.message });
  }
}

export function listEmployeesHandler(req, res) {
    try {
        const employees = findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export function findEmployeeByNameHandler(req, res) {
  try {
    const employee = findByName(req.params.name);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function listEmployeesByDepartmentHandler(req, res) {
  try {
    const employees = listByDepartment(req.params.department);
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "Employees not found" });
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function listEmployeesByPositionHandler(req, res) {
  try {
    const employees = listByPosition(req.params.position);
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "Employees not found" });
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function listEmployeesBySalaryHandler(req, res) {
  try {
    const employees = listBySalary(req.params.salary);
    if (!employees) {
      return res.status(404).json({ message: "Employees not found" });
    }
    res.status(200).json(employees);
} catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function deleteEmployeeHandler(req, res) {
  try {
    const deletedemployee = deleteById(req.params.id);
    if (!deletedemployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(deletedemployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function updateEmployeeHandler(req, res) {
  try {
    const updatedemployee = updateById(req.params.id, req.body);
    if (!updatedemployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedemployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
