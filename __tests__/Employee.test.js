const Employee = require('../lib/Employee');

test('create an Employee object', () => {
    const employee = new Employee('Todd', 0, 'todd@mail.com');

    expect(employee.name).toBe('Todd');
    expect(employee.id).toBe(0);
    expect(employee.email).toBe('todd@mail.com');

});