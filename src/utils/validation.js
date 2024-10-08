export function isValidString(str) { return typeof str === 'string' && str.trim() !== ''; };

export function isValidSalary(year) { return typeof year === 'number' && year > 0; };

export function validateEmployeeData(employee) {
    if (!isValidString(employee.name)) {
        return false;
    }
    if (!isValidString(employee.position)) {
        return false;
    }
    if (!isValidString(employee.department)) {
        return false;
    }
    if (!isValidSalary(employee.salary)) {
        return false;
    }
    return true;
}