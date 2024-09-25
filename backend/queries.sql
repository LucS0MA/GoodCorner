CREATE TABLE IF NOT EXISTS ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE
);

INSERT INTO ad (title, description, owner, price, picture, location, createdAt)
    VALUES (
        "blouson",
        "je vends mon blouson",
        "john.doe@gmail.com",
        100,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkhSfpK4Kc3w6PMHl0at0J8A3XlBeV2TAtw&s",
        "Lyon",
        DateTime('now')
    );