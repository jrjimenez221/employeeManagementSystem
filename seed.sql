USE employeeTrackerDB;

INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Jose", "Jimenez", 1);
INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Fer", "Jimenez", 2);
INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Neri", "Garcia", 3);
INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Josh", "Nava", 4);
INSERT INTO employees(first_name, last_name, role_id)
VALUES ("Kyle", "Forester", 5);


INSERT INTO role(title, salary, department_id, reports_to)
VALUES ("ceo", 200000, 1, null);
INSERT INTO role(title, salary, department_id,reports_to)
VALUES ("Vice President", 180000, 1, 1);
INSERT INTO role(title, salary, department_id,reports_to)
VALUES ("Sales Lead", 120000, 2, 2);
INSERT INTO role(title, salary, department_id,reports_to)
VALUES ("Sales Rep", 100000, 2, 3);
INSERT INTO role(title, salary, department_id,reports_to)
VALUES ("Head Engineer", 150000, 3, 2);

INSERT INTO department(name)
VALUES ("Executive");
INSERT INTO department(name)
VALUES ("Sales");
INSERT INTO department(name)
VALUES ("Engineering")



