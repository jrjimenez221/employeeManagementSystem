USE employeeTrackerDB;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Jose", "Jimenez", 1, null);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Fer", "Jimenez", 2, 1);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Neri", "Garcia", 3, 2);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Nava", 4, 3);
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Kyle", "Forester", 5, 2);


INSERT INTO role(title, salary, department_id)
VALUES ("ceo", 200000, 1);
INSERT INTO role(title, salary, department_id)
VALUES ("Vice President", 180000, 2);
INSERT INTO role(title, salary, department_id)
VALUES ("Sales Lead", 120000, 3);
INSERT INTO role(title, salary, department_id)
VALUES ("Sales Rep", 100000, 3);
INSERT INTO role(title, salary, department_id)
VALUES ("Head Engineer", 150000, 4);

INSERT INTO department(name)
VALUES ("ceo")
INSERT INTO department(name)
VALUES ("Vice President")
INSERT INTO department(name)
VALUES ("Sales")
INSERT INTO department(name)
VALUES ("Engineering")



