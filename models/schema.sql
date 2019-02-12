DROP DATABASE IF EXISTS appointmentdb;
CREATE DATABASE appointmentdb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE appointmentdb;

INSERT into appointments(customer_id, business_id, start_time, note, createdAt, updatedAt)
VALUES(1, 1, current_time(), "This is the first test appt", current_time(), current_time());

INSERT into appointments(customer_id, business_id, start_time, note, createdAt, updatedAt)
VALUES(2, 2, current_time(), "This is the second test appt", current_time(), current_time());


SELECT * FROM appointments;