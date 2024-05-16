-- tables

CREATE TABLE IF NOT EXISTS Students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Teachers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  time TEXT,
  teacherId INTEGER,
  studentId INTEGER,
  FOREIGN KEY(teacherId) REFERENCES Teachers(id),
  FOREIGN KEY(studentId) REFERENCES Students(id)
);


-- student datas

INSERT INTO Students (firstName, lastName, email, password) VALUES ('Zeynep Sude', 'Yücesoy', '1903041015@ybu.edu.tr', '123456');


-- teacher datas

INSERT INTO Teachers (firstName, lastName, email, password) VALUES ('Derya', 'Fındık', 'dfindik@aybu.edu.tr', '123456');