import { registerEmployeeModel } from '../models/employee.js';
import { register, findAll, findByName, listByDepartment, listByPosition, listBySalary, deleteById, updateById } from '../repository/employeeRepository.js';

export function registerEmployee(data) {
    const employee = registerEmployeeModel(data);
    return register(employee);
};

export function listEmployees() { return findAll() };

export function findEmployeeByName(name) { return findByName(name) };

export function listEmployeesByPosition(position) { return listByPosition(position) };

export function listEmployeesByDepartment(department) { return listByDepartment(department) };

export function listEmployeesBySalary(salary) { return listBySalary(salary) };

export function deleteEmployeeById(id) { return deleteById(id) };

export function updateEmployeeById(id, data) { return updateById(id, data) };