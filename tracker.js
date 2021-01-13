var mysql = require("mysql");
var inquirer = require("inquirer");

//import { viewDepartments } from "./functions/viewDepartments"

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeTrackerDB",
});
connection.connect(function (err) {
  if (err) throw err;
  start();
});
console.log(`%c 








 _______             _                            _______                                                          ______                              
(_______)           | |                          (_______)                                                 _      / _____)             _               
 _____   ____  ____ | | ___  _   _ _____ _____    _  _  _ _____ ____  _____  ____ _____ ____  _____ ____ _| |_   ( (____  _   _  ___ _| |_ _____ ____  
|  ___) |    \\|  _ \\| |/ _ \\| | | | ___ | ___ |  | ||_|| (____ |  _ \\(____ |/ _  | ___ |    \\| ___ |  _ (_   _)   \\____ \\| | | |/___|_   _) ___ |    \\ 
| |_____| | | | |_| | | |_| | |_| | ____| ____|  | |   | / ___ | | | / ___ ( (_| | ____| | | | ____| | | || |_    _____) ) |_| |___ | | |_| ____| | | |
|_______)_|_|_|  __/ \\_)___/ \\__  |_____)_____)  |_|   |_\\_____|_| |_\\_____|\\___ |_____)_|_|_|_____)_| |_| \\__)  (______/ \\__  (___/   \\__)_____)_|_|_|
              |_|           (____/                                         (_____|                                       (____/                        

 `, "font-family:monospace")
    //Main Menu
function start() {
  inquirer
    .prompt({
      name: "EmployeeTracker",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees", //done
        "View Roles",
        "View Departments",
        "View Department Budgets",
        "Add Employee", // optimization
        "Make Changes", //update and delete employees, roles and or departments
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.EmployeeTracker) {
        case "View Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Make Changes":
          makeChanges();
          break;
        case "View Roles":
          console.log("this works");
          viewRoles();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Department Budgets":
          viewDepartmentBudget();
          break;
        default:
          connection.end();
          break;
      }
    });
};

//Employee Views

//done
function viewEmployees() {
  inquirer
    .prompt({
      name: "ViewBy",
      type: "list",
      message: "Want to narrow down results?",
      choices: [
        "View All Employees",
        "View By Department", //done
        "View By Manager", //stuck
        "Return",
      ],
    })
    .then(function (answer) {
      switch (answer.ViewBy) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View By Department":
          viewByDepartment();
          break;
        case "View By Manager":
          viewByManager();
          break;
        default:
          start();
          break;
      }
    });
};
//done
function viewAllEmployees() {
  connection.query(
    "SELECT first_name, last_name, title, salary FROM employees LEFT JOIN role ON employees.role_id = role.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      viewEmployees();
    }
  );
};
//done
function viewByDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "Department",
        type: "rawlist",
        message: "View by which Department?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].name);
          }
          return choiceArray;
        },
      })
      .then(function (answer) {
        var query =
          "SELECT first_name, last_name, title FROM employees left join role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE name = ?";
        connection.query(query, [answer.Department], function (err, res) {
          if (err) throw err;
          // if (answer.Department === "ceo" || "Vice President"){
          //   console.log("Here's our " + answer.Department + ".")
          // }
          // else if (answer.Department != "ceo" || "Vice President"){
          //   console.log("Here's all those who work in the " + answer.Department + " department.")
          // }
          console.table(res);
          viewEmployees();
        });
      });
  });
};
//on hold
function viewByManager() {
  connection.query("SELECT * FROM employees LEFT JOIN role ON employees.role_id = role.id", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "Whose underlings are we searching for?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(
              {name: results[i].first_name + " " + results[i].last_name,
               value: results[i].id   
            }
              // let person[i] = results[i].first_name + results[i].last_name + results[i].id  
            );
          }
          return choiceArray;
        },
      })
      .then(function (manager) {    
        console.log(manager.id)
         var query ="SELECT first_name, last_name FROM employees  WHERE reports_to = ?";
        connection.query(query, [manager.id], function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
  });
};

// Role and Department Views
function viewRoles() {
  connection.query("SELECT title, salary FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("Here's the roles we have available in our company.");
    start();
  });
};
// function viewDepartments() {
//   connection.query("SELECT * FROM department", function (err, res) {
//     if (err) throw err;
//     console.table(res);
//     console.log("Here's the Departments we have in our company.");
//     start();
//   });
// };
 function viewDepartmentBudget() {
  console.log("-under construction-")
  start()
}
//   connection.query("SELECT * FROM department", function(err, results) {
//     if (err) throw err;
//     inquirer
//     .prompt([
//       {
//         name: "department",
//         type: "rawlist",
//         message: "Which department's budget do you wanna take a look at?",
//         choices: function () {
//           var choiceArray = [];
//           for (var i = 0; i < results.length; i++) {
//             choiceArray.push(
//               results[i].name,
//               );
//             }
//             return choiceArray;
//           },
//         }
//       ])
//     }) 
//     .then(answer)
//   }
  //connection.query(" SELECT SUM(salary) FROM department WHERE name = ?")
//select *,(maths + chemistry + physics ) AS total FROM `student`


//Add New employee - important enough to warrant a place in the main menu

//working (needs more user friendly spice)
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's role id?",
      },
      // {
      //   name: "manager_id",
      //   type: "input",
      //   message: "What is the employee's manager id?",
      // },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role_id || null,
          // manager_id: answer.manager_id || null,
        },
        function (err) {
          if (err) throw err;
          console.log("Another successfully captured drone!");
          start();
        }
      );
    });
};
function makeChanges() {
  inquirer
    .prompt([
      {
        name: "changeBeingMade",
        type: "list",
        message: "The world is ever changing and so is this company!",
        choices: ["Add Role Or Department", "Change Employee Role", "Return"],
      },
    ])
    .then(function (answer) {
      switch (answer.changeBeingMade) {
        case "Add Role Or Department":
          addSomething();
          break;

        case "Return":
          start();
          break;
          
        case "Change Employee Role":
          changeEmployeeRole();
          break;

        default:
          console.log("That can't be changed?");
          makeChanges();
          break;
      }
    });
};

function addSomething() {
  inquirer
    .prompt([
      {
        name: "addToWhat",
        type: "list",
        message: "Where are you adding to?",
        choices: ["Roles", "Departments"],
      },
    ])
    .then(function (answer) {
      switch (answer.addToWhat) {
        case "Roles":
          addRole();
          break;

        case "Departments":
          addDepartment();
          break;
        default:
          start();
          break;
      }
    });
};
//working (needs more user friendly spice)
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What's the title of this new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What's the salary for this role?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What Department Id does this role belong to?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id || null,
        },
        function (err) {
          if (err) throw err;
          console.log("Role successfully added.");
          start();
        }
      );
    });
};

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What's the name of this new Department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log("Department successfully added. Simple as that.");
          makeChanges();
        }
      );
    });
};

function changeEmployeeRole() {
  connection.query("SELECT * FROM employees LEFT JOIN role ON employees.role_id = role.id", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
        name: "employeeInQuestion",
        type: "list",
        message: "Which employee's moving up or down in the world today?",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(
              results[i].first_name + " " + results[i].last_name + " - " + results[i].title,
              );
            }
            return choiceArray;
          },
        }])
        .then(function (answer) {
          // let employeeInQuestionRole = answer.first_name;
          // console.log(employeeInQuestionRole)
          console.log(answer)
          console.log(answer.first_name)
          con

          connection.query("SELECT * FROM role", function (err, results) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "whatRole",
                type: "list",
                message: "Change " + answer + "'s role to?",
                choices: function () {
                  var choiceArray2 = [];
                  for (var i = 0; i < results.length; i++) {
                    choiceArray2.push(
                      results[i].first_name + " " + results[i].last_name + " " + results[i].title,
                      );
                  }
                  return choiceArray2;
                }
              }
            ])
        })
      })
  })
};

// Change Employee Role, View Employee by Manager, View Department Budget