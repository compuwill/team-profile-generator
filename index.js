const inquirer = require('inquirer');
const fs = require('fs');

const Intern = require('lib/Intern')
const Engineer = require('lib/Engineer')
const Manager = require('lib/Manager')


var team = [];

//load an existing team if there is
if (fs.existsSync('dist/team.json')) {
    fs.readFile('dist/team.json', (err, data) => {
        if (!err) {
            team = JSON.parse(data);
        }
        else {
            console.log(err);
        }

    })
}


//print the current number of team
console.log(`Total Team Members ${team.length}`);

//prompt to add a new employee
inquirer.prompt({
    type: 'confirm',
    name: 'add',
    message: 'Would you like to add a new employee?'
})
    .then(({ add }) => {
        if (add) {
            AddNewEmployee();
        }
    });


var AddNewEmployee = function () {

    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the Employee\'s name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the Employee\'s ID?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the Employee\'s Email?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What kind of role is this position?',
            choices: ['Intern', 'Engineer', 'Manager']
        }
    ])
        .then((data) => {
            if (data.role === 'Intern') {
                AddNewIntern(data);
            }
            if (data.role === 'Engineer') {
                AddNewEngineer(data);
            }
            if (data.role === 'Manager') {
                AddNewManager(data);
            }
        });

}

var AddNewIntern = function (data) {
    //promt to add a new employee
    inquirer.prompt({
        type: 'input',
        name: 'school',
        message: 'What school is this intern from?'
    })
        .then(({ school }) => {
            if (school) {
                const newIntern = new Intern(data.name, data.id, data.email, school)
                team.push(newIntern);
                SaveTeam();
            }
        });
}

var AddNewEngineer = function (data) {

}

var AddNewManager = function (data) {

}


var SaveTeam = function() {
    fs.writeFileSync('dist/team.json', JSON.stringify(team));
}