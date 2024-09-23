/* eslint-disable no-undef */
import { 
    registerEmployee, 
    listEmployees, 
    findEmployeeByName, 
    deleteEmployeeById, 
    updateEmployeeById, 
    listEmployeesByDepartment, 
    listEmployeesBySalary, 
    listEmployeesByPosition 
} from '../../service/employeeService.js';
import * as employeeRepository from '../../repository/employeeRepository.js';

jest.mock('../../repository/employeeRepository.js');

describe('Employee Service', () => {
    it('should register a employee', () => {
        const registeredEmployee = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position', id: null };
        jest.spyOn(employeeRepository, 'register').mockReturnValue(registeredEmployee);
    
        const result = registerEmployee({ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });
    
        expect(result).toEqual(registeredEmployee);
        expect(employeeRepository.register).toHaveBeenCalledWith({ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position', id: null });
    });

    it('should list all employee', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        employeeRepository.findAll.mockReturnValue(mockEmployees);

        const result = listEmployees();

        expect(result).toEqual(mockEmployees);
        expect(employeeRepository.findAll).toHaveBeenCalled();
    });

    it('should find a employee by name', () => {
        const mockEmploye = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' };
        employeeRepository.findByName.mockReturnValue(mockEmploye);

        const result = findEmployeeByName('Test name');

        expect(result).toEqual(mockEmploye);
        expect(employeeRepository.findByName).toHaveBeenCalledWith('Test name');
    });

    it('should list employees by position', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        employeeRepository.listByPosition.mockReturnValue(mockEmployees);

        const result = listEmployeesByPosition('Test position');

        expect(result).toEqual(mockEmployees);
        expect(employeeRepository.listByPosition).toHaveBeenCalledWith('Test position');
    });

    it('should list employees by department', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        employeeRepository.listByDepartment.mockReturnValue(mockEmployees);

        const result = listEmployeesByDepartment('Test department');

        expect(result).toEqual(mockEmployees);
        expect(employeeRepository.listByDepartment).toHaveBeenCalledWith('Test department');
    });

    it('should list employees by salary', () => {
        const mockEmployees = [{ name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' }];
        employeeRepository.listBySalary.mockReturnValue(mockEmployees);

        const result = listEmployeesBySalary(2022);

        expect(result).toEqual(mockEmployees);
        expect(employeeRepository.listBySalary).toHaveBeenCalledWith(2022);
    });

    it('should return null if employee to delete is not found', () => {
        employeeRepository.deleteById.mockReturnValue(null);

        const result = deleteEmployeeById('999');

        expect(result).toBeNull();
        expect(employeeRepository.deleteById).toHaveBeenCalledWith('999');
    });

    it('should delete a employee by id', () => {
        const mockEmploye = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position', id: '123' };
        employeeRepository.deleteById.mockReturnValue(mockEmploye);

        const result = deleteEmployeeById('123');

        expect(result).toEqual(mockEmploye);
        expect(employeeRepository.deleteById).toHaveBeenCalledWith('123');
    });

    it('should return null if employee to update is not found', () => {
        employeeRepository.updateById.mockReturnValue(null);

        const result = updateEmployeeById('999', { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });

        expect(result).toBeNull();
        expect(employeeRepository.updateById).toHaveBeenCalledWith('999', { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });
    });

    it('should update a employee by id', () => {
        const mockEmploye = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position', id: '123' };
        employeeRepository.updateById.mockReturnValue(mockEmploye);

        const result = updateEmployeeById('123', { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });

        expect(result).toEqual(mockEmploye);
        expect(employeeRepository.updateById).toHaveBeenCalledWith('123', { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' });
    });
});