const Engineer = require('../lib/Engineer');


test('create an Engineer object', () => {
    const engineer = new Engineer('Todd', 0, 'todd@mail.com', 'compuwill');

    expect(engineer.name).toBe('Todd');
    expect(engineer.id).toBe(0);
    expect(engineer.email).toBe('todd@mail.com');
    expect(engineer.getEmail()).toBe('mailto:todd@mail.com');
    expect(engineer.getGithub()).toBe('https://github.com/compuwill');
    expect(engineer.getRole()).toBe('Engineer');

});