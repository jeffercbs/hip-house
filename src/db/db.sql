CREATE TABLE reserves
(
    reserve_id    VARCHAR(36) PRIMARY KEY,
    reserve_date  DATE                                   NOT NULL,
    reserve_time  TIME                                   NOT NULL,
    visitor_dni   INTEGER(10) CHECK ( visitor_dni >= 0 ) NOT NULL,
    visitor_email VARCHAR(100)                           NOT NULL,
    visitor_name  VARCHAR(100)                           NOT NULL,
    visitor_phone VARCHAR(20)                            NOT NULL
)