import { Employee }from '../schemas/employeeSchema.js';
import { AppError } from '../../domain/error/customErros.js';

export async function createEmployee({ name, position, department, salary }) {
    try {
        const newEmployee = new Employee({
            name,
            position,
            department,
            salary,
        });
        return await newEmployee.save();
    } catch (error) {
        throw new AppError(error.message || 'Database error', 500);
    }
}

export async function updateById(id, { name, position, department, salary }) {
    try {
        return await Employee.findByIdAndUpdate(id, { name, position, department, salary }, {new: true})
    } catch (error) {
        throw new AppError(error.message || 'Database error', 500);
    }
}

export async function deleteById(id) {
    try {
        return await Employee.findByIdAndDelete(id, {lean: true});
    } catch (error) {
        throw new AppError(error.message || 'Database error', 500);
    }
}