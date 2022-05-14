import mysql from 'serverless-mysql';

var mysqlConnection = mysql({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

mysqlConnection.query(
  `CREATE TABLE IF NOT EXISTS match_history 
  (
	  id int auto_increment,
    username varchar(50) NOT NULL,
    game varchar(50) NOT NULL,
    score decimal(10, 3) NOT NULL,
    timestamp timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )`,
  function (error, _) {
    if (error) {
      console.log("Failed to create matchhistory table");
    } else {
      console.log("Table created successfully (matchhistory)");
    }
  }
);

mysqlConnection.query(
  `CREATE TABLE IF NOT EXISTS placementscores 
  (
	  id int auto_increment,
    username varchar(50) NOT NULL,
    memorytiles int,
    slidepuzzle int,
    numbermemo int,
    PRIMARY KEY (id)
  )`,
  function (error, _) {
    if (error) {
      console.log("Failed to create placementscores table");
    } else {
      console.log("Table created successfully (placementscores)");
    }
  }
);

module.exports = mysqlConnection;
