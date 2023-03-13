const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let newTeam = [];

// create Team manager
function createTeamManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Please enter Manager's name:",
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter Manager's ID:",
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter Manager's email:",
        },
        {
            type: 'input',
            name: 'number',
            message: "Please enter Manager's office number:",
        }]).then((userInput) => {
            const manager = new Manager(
                userInput.name, 
                userInput.id, 
                userInput.email, 
                userInput.number);
            newTeam.push(manager);
            console.log(newTeam);
            createNewEmployee();
        });
};

// create new Employee
function createNewEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'occupation',
            message: "Please select occupation for new Employee:",
            choices: ["Engineer", "Intern"],
        },
        {
            type: 'input',
            name: 'name',
            message: `Please enter Employee's name:`,
        },
        {
            type: 'input',
            name: 'id',
            message: `Please enter Employee's ID:`,
        },
        {
            type: 'input',
            name: 'email',
            message: `Please enter Employee's email:`,
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter Employee's school name:",
            when: input => input.occupation === "Intern",
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter Employee's github profile:",
            when: input => input.occupation === "Engineer",
        },
        {
            type: 'confirm',
            name: 'confirmChoice',
            message: 'Please confirm to add new Employee',
            default: false,
        }
    ]).then((employeeInput) => {
        const {name, id, email, occupation, github, school} = employeeInput;

        if (occupation === "Engineer") {
            newEmployee = new Engineer(name, id, email, github);
        } else if (occupation === "Intern") {
            newEmployee = new Intern(name, id, email, school)
        }
        newTeam.push(newEmployee);

        createNewEmployee(newTeam) ? employeeInput.confirmChoice : generateHTML();
    });
};

// function to create Team board in HTML
function generateHTML() {
    fs.mkdirSync(OUTPUT_DIR);
    const template = render(newTeam);
    fs.writeFile(outputPath, template, (error) => 
    error ? console.error(error) : console.log("TEAM has been created succesfully!"));
};

// function to initialize program
function init() {
    createTeamManager();
};

// function call to initialize program
init();

