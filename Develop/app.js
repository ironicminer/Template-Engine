const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const inquireAnswers = [];

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the persons role?",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
      {
        type: "input",
        message: "What is the persons name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the persons id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the persons Email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the interns school?",
        name: "school",
        when: (answers) => {
          return answers.role === "Intern";
        },
      },
      {
        type: "input",
        message: "What is the engineers GitHub?",
        name: "github",
        when: (answers) => {
          return answers.role === "Engineer";
        },
      },
      {
        type: "input",
        message: "What is the Managers office number?",
        name: "officeNumber",
        when: (answers) => {
          return answers.role === "Manager";
        },
      },
      {
        type: "confirm",
        message: "Would you like another Employee?",
        name: "recruit",
      },
    ])
    .then((answers) => {
      console.log(answers);
      inquireAnswers.push(answers);
      console.log(inquireAnswers);
      if (answers.recruit) {
        createTeam();
      } else {
        const teamMembers = inquireAnswers.map((recruited) => {
          switch (recruited.role) {
            case "Engineer":
              console.log(
                new Engineer(
                  recruited.name,
                  recruited.id,
                  recruited.email,
                  recruited.github
                )
              );
              return new Engineer(
                recruited.name,
                recruited.id,
                recruited.email,
                recruited.github
              );
            case "Intern":
              console.log(
                new Intern(
                  recruited.name,
                  recruited.id,
                  recruited.email,
                  recruited.school
                )
              );
              return new Intern(
                recruited.name,
                recruited.id,
                recruited.email,
                recruited.school
              );
            case "Manager":
              console.log(
                new Manager(
                  recruited.name,
                  recruited.id,
                  recruited.email,
                  recruited.officeNumber
                )
              );
              return new Manager(
                recruited.name,
                recruited.id,
                recruited.email,
                recruited.officeNumber
              );
            default:
              console.log("Unknown employee.");
          }
        });
        console.log(teamMembers);
        fs.writeFile(outputPath, render(teamMembers), (err) => {
          if (err) {
            throw err;
          }
          console.log("Saved!");
        });
      }
    })
    .catch((err) => {
      if (err) {
        throw ("Error: ", err);
      }
      console.log("Saved!");
    });
}
createTeam();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
