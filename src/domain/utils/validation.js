export function validateEmployee(name, position, department, salary) {
    if (typeof name !== 'string' || name.trim() === '') {
        return { valid: false, message: 'The name should be a valid string' };
    }
    if (typeof position !== 'string' || position.trim() === '') {
        return { valid: false, message: 'The position should be a valid string' };
    }
    if (typeof department !== 'string' || department.trim() === '') {
        return { valid: false, message: 'The department should be a valid number' };
    }
    if (typeof salary !== 'number' || isNaN(salary)) {
        return { valid: false, message: 'The salary should be a valid number' };
    }
    return { valid: true };
}