import { Employee }from '../schemas/employeeSchema.js';
import { AppError } from '../../domain/error/customErros.js';

export async function getAllEmployees() {
    try{
        const employee = await Employee.find();
        return employee;
    } catch(error){
        throw new AppError(error.message, 500);
    }
}

export async function getById(id) {
    try{
        const employee = await Employee.findById(id);
        return employee;
    } catch(error){
        throw new AppError(error.message, 500);
    }
}

export async function getByName(name) {
    try{
        const employee = await Employee.find({ name });
        return employee;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
}

export async function getByPosition(position) {
    try{
        const employee = await Employee.find({ position });
        return employee;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
}

export async function getByDepartment(department) {
    try{
        const employee = await Employee.find({ department });
        return employee;
    } catch (error) {
        throw new AppError(error.message, 500);
    }
}

export async function getBySalary(salary) {
    try{
        const employee = await Employee.find({ salary });
        return employee;
    } catch {
        throw new AppError(error.message, 500);
    }
}