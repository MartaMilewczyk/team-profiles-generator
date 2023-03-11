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

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// create Team manager

function teamManager() {
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
        });
};



