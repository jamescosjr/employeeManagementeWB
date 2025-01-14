import { generateId } from '../utils/generateId.js';


export let employees = [];

export function register(employee) {
    const id = generateId();
    const newEmployee = { ...employee, id };
    employees.push(newEmployee);
    return newEmployee;
};

export function findAll() { return employees };

export function findByName(name){ return employees.find(employee => employee.name === name) };

export function listByPosition(position) { return employees.filter(employee => employee.position === position) };

export function listByDepartment(department) { return employees.filter(employee => employee.department === department) };

export function listBySalary(salary) { return employees.filter(employee => employee.salary === salary) };

export function deleteById(id) {
    const index = employees.findIndex(employee => employee.id === id);
    if (index !== -1) {
        return employees.splice(index, 1)[0];
    }
    return null;
};

export function updateById(id, data) {
    const index = employees.findIndex(employee => employee.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...data };
        return employees[index];
    }
    return null;
}