DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Therapist;

-- Therapist table
CREATE TABLE Therapist (
    therapist_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    years_of_practice INT CHECK (years_of_practice >= 0),
    availability ENUM('TAKING CLIENTS', 'NOT TAKING CLIENTS') NOT NULL DEFAULT 'NOT TAKING CLIENTS'
);

-- Client table
CREATE TABLE Client (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20)
);

-- Session table: only stores an array of client IDs
CREATE TABLE Session (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    therapist_id INT NOT NULL,
    clientsList JSON NOT NULL,  -- stores only client_id, e.g., [1, 2]
    notes TEXT,
    session_date DATE NOT NULL,
    session_length INT CHECK (session_length > 0),
    regularity ENUM('WEEKLY', 'MONTHLY'),
    FOREIGN KEY (therapist_id) REFERENCES Therapist(therapist_id) ON DELETE CASCADE
);

-- Insert Client data
INSERT INTO Client (name, email, phone_number) VALUES
('Alice Smith', 'alice@example.com', '1234567890'),
('Bob Johnson', 'bob@example.com', '9876543210'),
('Charlie Lee', 'charlie@example.com', '1112223333'),
('David Kim', 'david@example.com', '2223334444'),
('Eva Liu', 'eva@example.com', '3334445555'),
('Frank Zhang', 'frank@example.com', '4445556666'),
('Grace Wong', 'grace@example.com', '5556667777'),
('Henry Chan', 'henry@example.com', '6667778888'),
('Irene Zhao', 'irene@example.com', '7778889999'),
('Jack Wu', 'jack@example.com', '8889990000');

-- Insert Therapist data
INSERT INTO Therapist (title, name, email, location, years_of_practice, availability) VALUES
('Dr.', 'Jane Doe', 'jane@example.com', 'New York', 10, 'TAKING CLIENTS'),
('Dr.', 'John Smith', 'john@example.com', 'Los Angeles', 8, 'TAKING CLIENTS'),
('Dr.', 'Emily Wang', 'emily@example.com', 'Chicago', 12, 'NOT TAKING CLIENTS');

-- Insert Session data (clientsList stores only client IDs)
INSERT INTO Session (
    therapist_id,
    clientsList,
    notes,
    session_date,
    session_length,
    regularity
) VALUES 
(
    1,
    JSON_ARRAY(1),
    'Single client consultation.',
    '2025-04-02',
    60,
    'WEEKLY'
),
(
    2,
    JSON_ARRAY(2, 3),
    'Group anxiety therapy.',
    '2025-04-03',
    90,
    'MONTHLY'
),
(
    1,
    JSON_ARRAY(4, 5, 10),
    'Family conflict resolution session.',
    '2025-04-04',
    75,
    'WEEKLY'
),
(
    2,
    JSON_ARRAY(10),
    'Individual therapy for stress.',
    '2025-04-05',
    60,
    'WEEKLY'
);
