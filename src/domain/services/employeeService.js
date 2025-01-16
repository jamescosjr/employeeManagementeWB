import {
    createEmployee,
    updateById,
    deleteById,
} from '../../infrastructure/repositories/employeeRepositoryWrite.js';
import {
    getAllEmployees,
    getById,
    getByPosition,
    getByDepartment,
    getBySalary,
    getByName
} from '../../infrastructure/repositories/employeeRepositoryRead.js';
import { AppError } from '../error/customErros.js'

export async function createEmployeeService({ name, position, department, salary }) {
    try {
        return await createEmployee({ name, position, department, salary });
    } catch (error) {
        throw new AppError(error.message || 'Error creating the Employee', 500);
    }
}

export async function updateEmployeeService(id, { name, position, department, salary }) {
    try{
        return await updateById(id, { name, position, department, salary });
    } catch (error) {
        throw new AppError(error.message || 'Error updating the Employee', 500);
    }
};

export async function deleteEmployeeService(id) {
    try {
        return await deleteById(id);
    } catch (error) {
        throw new AppError(error.message || 'Error deleting the Employee', 500);
    }
}

export async function getAllEmployeesService() {
    try {
        return await getAllEmployees();
    } catch (error) {
        throw new AppError(error.message || 'Error getting the Employees', 500);
    }
}

export async function getByIdService(id) {
    try {
        return await getById(id);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the Employee', 500);
    }
}

export async function getByNameService(name) {
    try{
        return await getByName(name);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the Employees', 500);
    }
}

export async function getByPositionService(position) {
    try {
        return await getByPosition(position);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the Employees', 500);
    }
}

export async function getByDepartmentService(department) {
    try {
        return await getByDepartment(department);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the Employees', 500);
    }
}

export async function getBySalaryService(salary) {
    try {
        return await getBySalary(salary);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the Employees', 500);
    }
}