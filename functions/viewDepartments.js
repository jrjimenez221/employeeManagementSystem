
module.exports={

  viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log("Here's the Departments we have in our company.");
      start();
    });
  }
}

