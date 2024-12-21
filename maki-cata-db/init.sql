-- Create the database
CREATE DATABASE IF NOT EXISTS blog_db;

-- Use the newly created database
USE blog_db;

-- Create the table
CREATE TABLE IF NOT EXISTS blog_entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NULL,
    date DATE NOT NULL,
    image_name VARCHAR(255) NULL
);

-- Grant all privileges to the user 'maki-cata'
GRANT ALL PRIVILEGES ON blog_db.* TO 'maki-cata'@'%';
FLUSH PRIVILEGES;


-- Optionally, insert initial data
INSERT INTO blog_entries (title, description, date, image_name)
VALUES 
('Sample Title', 'This is a sample description.', '2024-12-20', 'sample_image.jpg');