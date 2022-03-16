const Intern = require('../lib/Intern');


test('create an Intern object', () => {
    const intern = new Intern('Todd', 0, 'todd@mail.com', 'mcc');

    expect(intern.name).toBe('Todd');
    expect(intern.id).toBe(0);
    expect(intern.email).toBe('todd@mail.com');
    expect(intern.getEmail()).toBe('mailto:todd@mail.com');
    expect(intern.getSchool()).toBe('mcc');
    expect(intern.getRole()).toBe('Intern');

});