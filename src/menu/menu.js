import promptSync from 'prompt-sync';
import process from 'process';
import { 
    registerEmployee, 
    findEmployeeByName, 
    listEmployees, 
    listEmployeesByPosition, 
    listEmployeesByDepartment, 
    listEmployeesBySalary, 
    updateEmployee, 
    deleteEmployee 
} from './menuActions.js';

const prompt = promptSync({ sigint: true });

export function showMenu() {
    console.log('1. Register Employee');
    console.log('2. List Employees');
    console.log('3. Find Employee by name');
    console.log('4. List Employees by Department');
    console.log('5. List Employees by Position');
    console.log('6. List Employees by Salary');
    console.log('7. Delete Employee');
    console.log('8. Update Employee');
    console.log('0. Exit');
};

export function handleMenuOption(option) {
    switch (option) {
        case 1:
            registerEmployee();
            break;
        case 2:
            listEmployees();
            break;
        case 3:
            findEmployeeByName();
            break;
        case 4:
            listEmployeesByDepartment();
            break;
        case 5:
            listEmployeesByPosition();
            break;
        case 6:
            listEmployeesBySalary();
            break;
        case 7:
            deleteEmployee();
            break;
        case 8:
            updateEmployee();
            break;
        case 0:
            process.exit();
            break;
        default:
            console.log('Invalid option, please try again.');
    }       console.log('Invalid option, please try again.');
    
};

export function menuLoop  ()  {
    while (true) {
        showMenu();
        const option = parseInt(prompt('Select an option: '), 10);
        handleMenuOption(option);
    }
};