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
        "View All Employees By Manager",
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
          viewAllEmployees();
          break;
   
        case "View All Employees By Department":
          viewAllEmployeesByDepartment();
          break;
        case "View All Employees By Manager":
          viewAllEmployeesByManager();
          break;

        case "Add Employee":
          addEmployee();
          break;
      
        default:
          connection.end();
          break;
      }
     
    });
}
    
//done
function viewAllEmployees() {
  connection.query("SELECT first_name, last_name, title, salary FROM employees LEFT JOIN role ON employees.role_id = role.id", function(err, res) {
    if (err) throw err;
    console.table(res);
    start()
  })
}
//done
function viewAllEmployeesByDepartment() {
  connection.query("SELECT * FROM department", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "Department",
        type: "rawlist",
        message: "View by which Department?",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].name)
          }
          return choiceArray
        }
      })
      .then(function(answer) {
        var query = "SELECT first_name, last_name, title FROM employees left join role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE name = ?";
        connection.query(query, [answer.Department], function(err, res) {
          if (err) throw err;
          console.table(res)
          start()
        });
      });    
  })
}
//on hold
function viewAllEmployeesByManager() {
  connection.query("SELECT * FROM employees", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "Manager",
        type: "rawlist",
        message: "Whose underlings are we searching for?",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].first_name + " " + results[i].last_name)
          }
          return choiceArray
        }
      })
      .then(function(answer) {
        var query = "SELECT first_name, last_name FROM employees WHERE manager_id = ?";
        connection.query(query, [answer.Manager], function(err, res) {
          if (err) throw err;
          console.table(res)
          start()
        });
      });    
  })
}//needs work
function addEmployee() {
  inquirer
    .prompt([
      {
      name: "firstname",
      type: "input",
      message: "What is the employee's first name?"
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name?"
        },
        {
          name: "role_id",
          type: "input",
          message: "What is the employee's role id?"
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the employee's manager id?"
        }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.role_id || null,
          manager_id: answer.manager_id || null
        },
        function(err) {
          if (err) throw err;
          console.log("Another successfully captured drone!")
          start()
        }
      )
    })
}
