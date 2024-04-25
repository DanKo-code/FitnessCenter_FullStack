CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role SMALLINT NOT NULL
);

CREATE TABLE refresh_sessions(
    id uniqueidentifier PRIMARY KEY,
    user_id uniqueidentifier NOT NULL REFERENCES Client(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(32) NOT NULL
);

SELECT * FROM users;
SELECT * FROM refresh_sessions;