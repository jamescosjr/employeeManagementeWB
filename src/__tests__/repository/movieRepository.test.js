/* eslint-disable no-undef */
import {
    register,
    findAll,
    findByName,
    deleteById,
    updateById,
    listByDepartment,
    listByPosition,
    listBySalary,
    employees,
 } from '../../repository/employeeRepository.js';
import { generateId } from '../../utils/generateId.js';

jest.mock('../../utils/generateId.js');
const mockGenerateId = generateId;

describe('Employee Repository', () => {
    beforeEach(() => {
        employees.length = 0; 
        mockGenerateId.mockClear(); 
    });

    it('should register a new employee with a unique id', () => {
        const id = generateId();
        const employeeData = { name: 'Test name', department: 'Test department', salary: 2022, position: 'Test position' };
        const registeredEmployee = register(employeeData);

        expect(registeredEmployee).toMatchObject(employeeData);
        expect(typeof registeredEmployee.id).toEqual(expect.any(String));
        expect(findAll()).toContainEqual(registeredEmployee);
        expect(id).toBe(registeredEmployee.id);
    });

    it('should find all employees', () => {
        mockGenerateId.mockReturnValueOnce('id1').mockReturnValueOnce('id2');
        const employee1 = register({ name: 'name 1', department: 'department 1', salary: 2021, position: 'position 1' });
        const employee2 = register({ name: 'name 2', department: 'department 2', salary: 2022, position: 'position 2' });

        const allEmployees = findAll();

        expect(allEmployees).toEqual([employee1, employee2]);
    });

    it('should find a employee by name', () => {
        mockGenerateId.mockReturnValue('unique-id');
        const employee = register({ name: 'Unique name', department: 'Unique department', salary: 2022, position: 'Unique position' });
        const foundEmployee = findByName('Unique name');

        expect(foundEmployee).toEqual(employee);
    });

    it('should return undefined when finding a employee by a non-existing name', () => {
        const foundEmployee = findByName('Non-existing name');

        expect(foundEmployee).toBeUndefined();
    });

    it('should list employees by position', () => {
        mockGenerateId.mockReturnValue('unique-id');
        const employee1 = register({ name: 'name 1', department: 'department 1', salary: 2021, position: 'position 1' });
        const employee2 = register({ name: 'name 2', department: 'department 2', salary: 2022, position: 'position 2' });

        const employeesByposition = listByPosition('position 1');
        const employeesByposition2 = listByPosition('position 2');

        expect(employeesByposition2).toEqual([employee2]);
        expect(employeesByposition).toEqual([employee1]);
    });

    it('should list employees by department', () => {
        mockGenerateId.mockReturnValue('unique-id');
        const employee1 = register({ name: 'name 1', department: 'department 1', salary: 2021, position: 'position 1' });
        const employee2 = register({ name: 'name 2', department: 'department 2', salary: 2022, position: 'position 2' });

        const employeesBydepartment = listByDepartment('department 2');
        const employeesBydepartment2 = listByDepartment('department 1');

        expect(employeesBydepartment).toEqual([employee2]);
        expect(employeesBydepartment2).toEqual([employee1]);
    });

    it('should list employees by salary', () => {
        mockGenerateId.mockReturnValue('unique-id');
        const employee1 = register({ name: 'name 1', department: 'department 1', salary: 2021, position: 'position 1' });
        const employee2 = register({ name: 'name 2', department: 'department 2', salary: 2022, position: 'position 2' });

        const employeesBysalary = listBySalary(2021);
        const employeesBysalary2 = listBySalary(2022);

        expect(employeesBysalary).toEqual([employee1]);
        expect(employeesBysalary2).toEqual([employee2]);
    });

    it('should return an empty array when listing employees by a non-existing salary', () => {
        const employeesBysalary = listBySalary(2021);

        expect(employeesBysalary).toEqual([]);
    });

    it('should return an empty array when listing employees by a non-existing department', () => {
        const employeesBydepartment = listByDepartment('department');

        expect(employeesBydepartment).toEqual([]);
    });

    it('should return an empty array when listing employees by a non-existing position', () => {
        const employeesByposition = listByPosition('position');

        expect(employeesByposition).toEqual([]);
    });

    it('should delete a employee by id', () => {
        mockGenerateId.mockReturnValue('unique-id');
        const employee = register({ name: 'name to Delete', department: 'department', salary: 2022, position: 'position' });
        const deletedEmployee = deleteById(employee.id);

        expect(deletedEmployee).toEqual(employee);
        expect(findAll()).not.toContainEqual(employee);
    });

    it('should return null when deleting a employee by a non-existing id', () => {
        const deletedEmployee = deleteById('non-existing-id');

        expect(deletedEmployee).toBeNull();
    });

    it('should update a employee by id', () => {
        mockGenerateId.mockReturnValue('unique-id');
        const employee = register({ name: 'name to Update', department: 'department', salary: 2022, position: 'position' });
        const updatedEmployee = updateById(employee.id, { name: 'Updated name' });

        expect(updatedEmployee).toMatchObject({ ...employee, name: 'Updated name' });
    });

    it('should return null when updating a employee by a non-existing id', () => {
        const updatedEmployee = updateById('non-existing-id', { name: 'Updated name' });

        expect(updatedEmployee).toBeNull();
    });
});
