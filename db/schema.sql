CREATE TABLE categories (
    id BINARY(16) PRIMARY KEY default (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL UNIQUE,
    color VARCHAR(7) NOT NULL DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE diaries (
    id BINARY(16) PRIMARY KEY default (UUID_TO_BIN(UUID())),
    title varchar(255) NOT NULL,
    category BINARY(16),
    isFav BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_category
    FOREIGN KEY (category)
    REFERENCES categories(id)
    ON DELETE CASCADE
);

CREATE TABLE entries (
    id          BINARY(16)   PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    parent_id   BINARY(16)   NOT NULL,
    title       VARCHAR(255) NOT NULL,
    content     TEXT         NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_diary
        FOREIGN KEY (parent_id)
        REFERENCES diaries(id)
        ON DELETE CASCADE
);