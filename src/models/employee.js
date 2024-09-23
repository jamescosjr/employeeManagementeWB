function validateEmployeeData({ name, position, department, salary }) {
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid name');
    }
    if (!position || typeof position !== 'string') {
        throw new Error('Invalid position');
    }
    if (!department || typeof department !== 'string' || department < 0) {
        throw new Error('Invalid department');
    }
    if (!salary || typeof salary !== 'number' || salary < 0) {
        throw new Error('Invalid salary');
    }
};

export function registerEmployeeModel({ name, position, department, salary }) {
    validateEmployeeData({ name, position, department, salary });
    return { name, position, department, salary, id: null };
};