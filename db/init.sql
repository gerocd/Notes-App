create database GeronimoCordoba;
use GeronimoCordoba;
CREATE TABLE Notes (
 idNotes INT AUTO_INCREMENT,
 title VARCHAR(100),
 content TEXT,
 archived BOOLEAN DEFAULT FALSE,
 PRIMARY KEY(idNotes)
);

CREATE TABLE Categories (
 idCategories INT AUTO_INCREMENT,
 name VARCHAR(50),
 PRIMARY KEY(idCategories)
);

CREATE TABLE Category_Notes (
 note_id INT,
 category_id INT,
 PRIMARY KEY(note_id, category_id),
 FOREIGN KEY(note_id) REFERENCES Notes(idNotes),
 FOREIGN KEY(category_id) REFERENCES Categories(idCategories)
);
