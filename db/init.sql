-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS GeronimoCordoba;
USE GeronimoCordoba;

-- Crear tabla Notes si no existe
CREATE TABLE IF NOT EXISTS Notes (
 idNotes INT AUTO_INCREMENT,
 title VARCHAR(100),
 content TEXT,
 archived BOOLEAN DEFAULT FALSE,
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY(idNotes)
);

-- Crear tabla Categories si no existe
CREATE TABLE IF NOT EXISTS Categories (
 idCategories INT AUTO_INCREMENT,
 name VARCHAR(50),
 PRIMARY KEY(idCategories)
);

-- Crear tabla Category_Notes si no existe
CREATE TABLE IF NOT EXISTS Category_Notes (
 note_id INT,
 category_id INT,
 PRIMARY KEY(note_id, category_id),
 FOREIGN KEY(note_id) REFERENCES Notes(idNotes) ON DELETE CASCADE,
 FOREIGN KEY(category_id) REFERENCES Categories(idCategories) ON DELETE CASCADE
);
