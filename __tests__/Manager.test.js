const Manager = require('../lib/Manager');


test('create a Manager object', () => {
    const manager = new Manager('Todd', 0, 'todd@mail.com', '816-123-1234');

    expect(manager.name).toBe('Todd');
    expect(manager.id).toBe(0);
    expect(manager.email).toBe('todd@mail.com');
    expect(manager.officeNumber).toBe('816-123-1234');

});