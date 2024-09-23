import promptSync from 'prompt-sync';
import { 
    registerEmployeeHandler,
    listEmployeesHandler,
    findEmployeeByNameHandler,
    listEmployeesByPositionHandler,
    listEmployeesByDepartmentHandler, 
    listEmployeesBySalaryHandler,
    deleteEmployeeHandler,
    updateEmployeeHandler 
} from '../controllers/employeeController.js';


const prompt = promptSync({ sigint: true });

export function registerEmployee() {
    const name = prompt('Enter the employee name: ');
    const position = prompt('Enter the employee position: ');
    const salary = parseInt(prompt('Enter the employee salary: '), 10);
    const department = prompt('Enter the employee department: ');

    registerEmployeeHandler({ name, position, salary, department });
};

export function listEmployees() {
    listEmployeesHandler();
};

export function findEmployeeByName() {
    const name = prompt('Enter the employee name to search: ');
    findEmployeeByNameHandler(name);
};

export function listEmployeesByPosition() {
    const position = prompt('Enter the position to search: ');
    listEmployeesByPositionHandler(position);
}

export function listEmployeesByDepartment() {
    const department = prompt('Enter the department to search: ');
    listEmployeesByDepartmentHandler(department);
}

export function listEmployeesBySalary() {
    const salary = parseInt(prompt('Enter the salary to search: '), 10);
    listEmployeesBySalaryHandler(salary);
}

export function deleteEmployee() {
    const id = prompt('Enter the employee ID to delete: ');
    deleteEmployeeHandler(id);
};

export function updateEmployee() {
    const id = prompt('Enter the employee ID to update: ');
    const name = prompt('Enter the employee name: ');
    const department = prompt('Enter the employee department: ');
    const salary = parseInt(prompt('Enter the employee salary: '), 10);
    const position = prompt('Enter the employee position: ');

    const updatedEmployee = {};

    if (name) updatedEmployee.name = name;
    if (department) updatedEmployee.department = department;
    if (salary) updatedEmployee.salary = salary;
    if (position) updatedEmployee.position = position;

    updateEmployeeHandler(id, updatedEmployee);
}