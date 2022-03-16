const inquirer = require('inquirer');
const fs = require('fs');

const Intern = require('./lib/Intern')
const Engineer = require('./lib/Engineer')
const Manager = require('./lib/Manager')


var team = [];

var PromptWhatToDo = function () {
    //print the current number of team members and their roles and names
    console.log(`|| Total Team Members ${team.length} ||`);
    console.log(`----------------------------------------`);
    team.forEach(object => {
        console.log(`${object.getRole()}: ${object.getName()}`);
    })
    console.log(`----------------------------------------`);


    //prompt what to do
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['➕ Add a new Team Member', '➖ Delete a Team Member', '✅ Generate the Team Page', '❌ Quit']

    })
        .then(({ option }) => {
            if (option === '➕ Add a new Team Member') {
                AddNewEmployee();
            }
            if (option === '➖ Delete a Team Member') {
                DeleteTeamMember();
            }
            if (option === '✅ Generate the Team Page') {
                GenerateHTMLPage();
            }
        });


}


var AddNewEmployee = function () {

    //set default questions
    var questions =
        [
            {
                type: 'input',
                name: 'name',
                message: 'What is the Team Member\'s name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the Team Member\'s ID?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the Team Member\'s Email?'
            },
        ];


    inquirer.prompt({
        type: 'list',
        name: 'role',
        message: 'What kind of role is this Team Member in?',
        choices: ['Intern', 'Engineer', 'Manager']
    })
        .then(({ role }) => {

            if (role === 'Intern') {
                questions.push({
                    type: 'input',
                    name: 'school',
                    message: 'What school is this intern from?'
                })
            }
            if (role === 'Engineer') {
                questions.push({
                    type: 'input',
                    name: 'github',
                    message: 'What is this engineer\'s github username?'
                })
            }
            if (role === 'Manager') {
                questions.push({
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is this manager\'s office number?'
                })
            }

            //ask the questions
            inquirer.prompt(questions)
                .then((data) => {
                    if (data.school) { //if an intern
                        const newIntern = new Intern(data.name, data.id, data.email, data.school)
                        AddTeamMember(newIntern);
                    }
                    if (data.github) { //if an engineer
                        const newEngineer = new Engineer(data.name, data.id, data.email, data.github)
                        AddTeamMember(newEngineer);
                    }
                    if (data.officeNumber) { //if a manager
                        const newManager = new Manager(data.name, data.id, data.email, data.officeNumber)
                        AddTeamMember(newManager);
                    }
                });

        });

}

var AddTeamMember = function (employee) {
    //check if the id exists already
    var fail = false;
    team.forEach(existingTeamMember => {
        if (existingTeamMember.getId() === employee.getId()) {
            console.log('❌ Hey! That ID already exists!');            
            inquirer.prompt({
                type: 'input',
                name: 'newid',
                message: 'Enter in a different Team Member ID.'
            }).then(({ newid }) => {
                employee.id = newid;
                AddTeamMember(employee);
            })
            
            fail = true;
            return;
        }
    });

    if(fail == false)
    {
        team.push(employee);
        SaveTeam();
        console.log(`${employee.getRole()} '${employee.name}' has been added!`);
        PromptWhatToDo();
    }
}

var DeleteTeamMember = function () {
    //delete which team member?
    inquirer.prompt({
        type: 'list',
        message: 'Which team member would you like to delete?',
        name: 'delEmp',
        choices: team.map((employee) => `${employee.getId()}: ${employee.name}`)
    })
        .then(({ delEmp }) => {
            const empDetails = delEmp.split(': ');
            var newTeam = [];

            team.forEach(member => {
                if (member.getId() === empDetails[0])
                    console.log(`❌ Employee '${member.name}' has been deleted.`);
                else
                    newTeam.push(member);
            })
            team = newTeam;
            SaveTeam();
            PromptWhatToDo();
        });
}

var SaveTeam = function () {
    //sort the team members
    team.sort((a, b) => (a.role > b.role) ? 1 : -1);
    fs.writeFileSync('dist/team.json', JSON.stringify(team, null, '\t'));

}


var GenerateHTMLPage = function () {
    //output the json file again
    SaveTeam();

    //copy out the html src
    fs.copyFileSync('./src/index.html','./dist/index.html');

    //copy out the script src
    fs.copyFileSync('./src/script.js','./dist/script.js');

    console.log('✅ Your page has been generated! Please visit the index.html inside the /dist/ folder!');
}



//load an existing team if there is one
if (fs.existsSync('./dist/team.json')) {
    fs.readFile('./dist/team.json', (err, data) => {
        if (!err) {
            var jsonTeam = JSON.parse(data);
            //convert each json employee into a true node object
            jsonTeam.forEach(employee => {
                if (employee.role == 'Intern') {
                    var newIntern = new Intern(employee.name, employee.id, employee.email, employee.school);
                    team.push(newIntern);
                }
                if (employee.role == 'Engineer') {
                    var newEngineer = new Engineer(employee.name, employee.id, employee.email, employee.github);
                    team.push(newEngineer);
                }
                if (employee.role == 'Manager') {
                    var newManager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
                    team.push(newManager);
                }
            })


            console.log('Loaded existing team!')

            PromptWhatToDo();
        }
        else {
            console.log(err);
        }

    })
}
else {
    //no existing team
    PromptWhatToDo();
}