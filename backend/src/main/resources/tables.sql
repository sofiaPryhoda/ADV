CREATE TABLE users
(
    id            SERIAL,
    name          VARCHAR(128) NOT NULL,
    surname       VARCHAR(128) NOT NULL,
    email         VARCHAR(128) NOT NULL,
    phone         VARCHAR(13)  NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email),
    UNIQUE (phone)
);
CREATE TABLE categories
(
    id            SERIAL,
    name          VARCHAR(128) NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (name)
);
CREATE TABLE advertisements
(
    id            SERIAL,
    name          VARCHAR(256)  NOT NULL,
    description   VARCHAR(1024) NOT NULL,
    user_id       INT           NOT NULL,
    category_id   INT           NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES caregories (id),
    PRIMARY KEY (id)
);
