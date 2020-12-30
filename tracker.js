var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "employeeTrackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});
//viewAll();
function start() {
  inquirer
    .prompt({
      name: "EmployeeTracker",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees",
        "View All Employees By Department",
        "View All Employees By manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "EXIT"
      ]
    })
    .then(function(answer) {
      switch (answer.EmployeeTracker) {
        case "View All Employees":
          viewAll();
          break;
   
        case "MANAGE":
          manageCompany();
          break;
      
        default:
          connection.end();
          break;
      }
     
    });
}
    
    
function viewAll() {
  connection.query("SELECT first_name, last_name, title, salary FROM employees LEFT JOIN role ON employees.role_id = role.id", function(err, res) {
    if (err) throw err;
    console.table(res);
    start()
  })
}
    