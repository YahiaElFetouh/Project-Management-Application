CREATE TABLE User (
  user_id INT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  question VARCHAR(255) NOT NULL,
  answer VARCHAR(255) NOT NULL
);



CREATE TABLE Workspace (
  workspace_id INT PRIMARY KEY AUTO_INCREMENT,
  workspace_name VARCHAR(255) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
  
);
CREATE TABLE Board (
  board_id INT PRIMARY KEY ,
  board_name VARCHAR(255) NOT NULL,
  workspace_id INT,
  FOREIGN KEY (workspace_id) REFERENCES Workspace(workspace_id)
);

CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  task_name VARCHAR(255) NOT NULL,
  status VARCHAR(25) NOT NULL,
  board_id INT,
  FOREIGN KEY (board_id) REFERENCES Board(board_id)
);

CREATE TABLE Task_has_user (
  task_id INT,
  user_id INT,
  PRIMARY KEY (task_id, user_id),
  FOREIGN KEY (task_id) REFERENCES Task(task_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

ALTER TABLE User
CHANGE COLUMN question security_question VARCHAR(255);

ALTER TABLE User
CHANGE COLUMN answer security_answer VARCHAR(255);
