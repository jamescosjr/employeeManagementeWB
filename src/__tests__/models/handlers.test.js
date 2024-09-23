/* eslint-disable no-undef */
import {
    registerEmployeeHandler,
    listEmployeesHandler,
    findEmployeeByNameHandler,
    listEmployeesByPositionHandler,
    listEmployeesByDepartmentHandler,
    listEmployeesBySalaryHandler,
    deleteEmployeeHandler,
    updateEmployeeHandler 
 } from '../../controllers/employeeController.js';
import * as employeeService from '../../service/employeeService.js';

const logSpy = jest.spyOn(console, 'log').mockImplementation();
const errorSpy = jest.spyOn(console, 'error').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

describe('EMployee Handlers', () => {
    it('should log success message when registering a employee', () => {
        const mockEmployee = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' };
        jest.spyOn(employeeService, 'registerEmployee').mockReturnValue(mockEmployee);

        registerEmployeeHandler(mockEmployee);

        expect(logSpy).toHaveBeenCalledWith('employee registered successfully:', mockEmployee);
    });   

    it('should log error message when registering a employee fails', () => {
        jest.spyOn(employeeService, 'registerEmployee').mockImplementation(() => {
            throw new Error('Creation Error');
        });

        registerEmployeeHandler({ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });

        expect(errorSpy).toHaveBeenCalledWith('Error registering employee:', 'Creation Error');
    });

    it('should list all employee', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        jest.spyOn(employeeService, 'listEmployees').mockReturnValue(mockEmployees);
    
        listEmployeesHandler();
    
        expect(logSpy).toHaveBeenCalledWith('employees:', mockEmployees);
    });

    it('should find a employee by name', () => {
        const mockEmployee = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' };
        jest.spyOn(employeeService, 'findEmployeeByName').mockReturnValue(mockEmployee);
    
        findEmployeeByNameHandler('Test name');
    
        expect(logSpy).toHaveBeenCalledWith('employee found:', mockEmployee);
    });
    
    it('should log not found message if employee is not found', () => {
        jest.spyOn(employeeService, 'findEmployeeByName').mockReturnValue(null);
    
        findEmployeeByNameHandler('Nonexistent name');
    
        expect(logSpy).toHaveBeenCalledWith('employee not found');
    });

    it('should list employee by position', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        jest.spyOn(employeeService, 'listEmployeesByPosition').mockReturnValue(mockEmployees);  
    });

    it('should list employees by department', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        jest.spyOn(employeeService, 'listEmployeesByDepartment').mockReturnValue(mockEmployees);
    });

    it('should list employees by salary', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        jest.spyOn(employeeService, 'listEmployeesBySalary').mockReturnValue(mockEmployees);
    });

    it('should log error message when listing employees by position fails', () => {
        jest.spyOn(employeeService, 'listEmployeesByPosition').mockImplementation(() => {
            throw new Error('Employee not found');
        });
    
        listEmployeesByPositionHandler('Test position');
    
        expect(errorSpy).toHaveBeenCalledWith('Error listing employees by position:', 'Employee not found');
    });

    it('should log error message when listing employees by department fails', () => {
        jest.spyOn(employeeService, 'listEmployeesByDepartment').mockImplementation(() => {
            throw new Error('Employee not found');
        });
    
        listEmployeesByDepartmentHandler('Test department');
    
        expect(errorSpy).toHaveBeenCalledWith('Error listing employees by department:', 'Employee not found');
    });

    it('should log error message when listing employees by salary fails', () => {
        jest.spyOn(employeeService, 'listEmployeesBySalary').mockImplementation(() => {
            throw new Error('Employee not found');
        });
    
        listEmployeesBySalaryHandler(2022);
    
        expect(errorSpy).toHaveBeenCalledWith('Error listing employees by salary:', 'Employee not found');
    });
    
    it('should delete a employee by id', () => {
        const mockEmployee = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Teste position', id: 1 };
        jest.spyOn(employeeService, 'deleteEmployeeById').mockReturnValue(mockEmployee);

        deleteEmployeeHandler(1);

        expect(logSpy).toHaveBeenCalledWith('employee deleted successfully:', mockEmployee);
    });

    it('should log not found message if employee to delete is not found', () => {
        jest.spyOn(employeeService, 'deleteEmployeeById').mockReturnValue(null);
    
        deleteEmployeeHandler(999);
    
        expect(logSpy).toHaveBeenCalledWith('employee not found, nothing to delete.');
    });
    
    it('should log error message when deleting a employee fails', () => {
        jest.spyOn(employeeService, 'deleteEmployeeById').mockImplementation(() => {
            throw new Error('Deletion Error');
        });
    
        deleteEmployeeHandler(1);
    
        expect(errorSpy).toHaveBeenCalledWith('Error deleting employee:', 'Deletion Error');
    });

    it('should update a employee by id', () => {
        const mockEmployee = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Teste position', id: 1 };
        jest.spyOn(employeeService, 'updateEmployeeById').mockReturnValue(mockEmployee);

        updateEmployeeHandler(1, mockEmployee);

        expect(logSpy).toHaveBeenCalledWith('employee updated successfully:', mockEmployee);
    });

    it('should log not found message if employee to update is not found', () => {
        jest.spyOn(employeeService, 'updateEmployeeById').mockReturnValue(null);
    
        updateEmployeeHandler(999, { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });
    
        expect(logSpy).toHaveBeenCalledWith('employee not found, nothing to update.');
    });
});
