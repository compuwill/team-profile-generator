const Employee = require('./Employee')

class Engineer extends Employee {
    constructor(name, id, email, github) {
        //call parent constructor
        super(name,id,email)
        this.github = github;
        this.role = 'Engineer' //override the role
    }

    getGithub() {
        return `https://github.com/${this.github}`;
    }

}

module.exports = Engineer;