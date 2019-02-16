use appointmentdb;
select * from appointments;
select * from clients;
select * from customers;
drop table appointments;
drop table clients;
drop table customers;

insert into clients (bus_name, first_apt, last_apt, email, password, createdAt, updatedAt)
value ("Business 1",  "8:30:00", "4:30:00", "bus1@bus.com", "welcome", '2019-02-12 11:02:19', '2019-02-12 11:02:19'),
("Business 2",  "9:30:00", "4:30:00", "bus2@bus.com", "welcome", '2019-02-12 11:02:19', '2019-02-12 11:02:19');


insert into customers (name, email, phone, createdAt, updatedAt)
value ("Libby Duggan",  "test@test.com", "919-555-5555", '2019-02-12 11:02:19', '2019-02-12 11:02:19'),
("Sara Austin",  "test2@test.com", "919-555-5556", '2019-02-12 11:02:19', '2019-02-12 11:02:19');