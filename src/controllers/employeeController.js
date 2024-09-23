import { 
    registerEmployee, 
    listEmployees, 
    findEmployeeByName, 
    listEmployeesByPosition, 
    listEmployeesByDepartment, 
    listEmployeesBySalary, 
    deleteEmployeeById, 
    updateEmployeeById 
} from '../service/employeeService.js';

export function registerEmployeeHandler(data) {
    try {
        const employee = registerEmployee(data);
        console.log('employee registered successfully:', employee);
    } catch (error) {
        console.error('Error registering employee:', error.message);
    }
};

export function listEmployeesHandler() {
    const employees = listEmployees();
    console.log('employees:', employees);
};

export function findEmployeeByNameHandler(name) {
    const employee = findEmployeeByName(name);
    if (!employee) {
        console.log('employee not found');
        return;
    }
    console.log('employee found:', employee);
};

export function listEmployeesByDepartmentHandler(department) {
    try {
        const employees = listEmployeesByDepartment(department);
        console.log('employees found:', employees);
    } catch (error) {
        console.error('Error listing employees by department:', error.message);
    }
}

export function listEmployeesByPositionHandler(position) {
    try {
        const employees = listEmployeesByPosition(position);
        console.log('employees found:', employees);
    } catch (error) {
        console.error('Error listing employees by position:', error.message);
    }
}

export function listEmployeesBySalaryHandler(salary) {
    try {
        const employees = listEmployeesBySalary(salary);
        console.log('employees found:', employees);
    } catch (error) {
        console.error('Error listing employees by salary:', error.message);
    }
}

export function deleteEmployeeHandler(id) {
    try {
        const deletedemployee = deleteEmployeeById(id);
        if (!deletedemployee) {
            console.log('employee not found, nothing to delete.');
            return;
        }
        console.log('employee deleted successfully:', deletedemployee);
    } catch (error) {
        console.error('Error deleting employee:', error.message);
    }
};

export function updateEmployeeHandler(id, data) {
    try {
        const updatedemployee = updateEmployeeById(id, data);
        if (!updatedemployee) {
            console.log('employee not found, nothing to update.');
            return;
        }
        console.log('employee updated successfully:', updatedemployee);
    } catch (error) {
        console.error('Error updating employee:', error.message);
    }
};