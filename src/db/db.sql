CREATE TABLE reserves (
    reserve_id VARCHAR(36) PRIMARY KEY,
    reserve_date DATE NOT NULL,
    reserve_time TIME NOT NULL,
    reserve_status VARCHAR(20),
    visitor_dni INTEGER(10) NOT NULL,
    visitor_email VARCHAR(100) NOT NULL UNIQUE,
    visitor_name VARCHAR(100) NOT NULL,
    visitor_phone VARCHAR(20) NOT NULL
);
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    user_name VARCHAR(225) NOT NULL,
    user_picture VARCHAR(225) NOT NULL,
    user_email VARCHAR(100) NOT NULL UNIQUE,
    user_role VARCHAR(20) NOT NULL
);
