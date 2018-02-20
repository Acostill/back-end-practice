DROP DATABASE IF EXISTS practice;
CREATE DATABASE practice;

-- \connect is the same as \c THEY BOTH CONNECT YOU TO THE DB
\connect practice; 

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    firstname VARCHAR,
    lastname VARCHAR,
    password_digest VARCHAR
);

INSERT INTO users(
username, firstname, lastname, password_digest) VALUES
('Acostill', 'Gerson', 'Castillo', 'acostillpass');
