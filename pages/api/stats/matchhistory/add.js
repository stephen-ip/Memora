const mysqlConnection = require("../../connection");

export default function handler(req, res) {
  const body = JSON.parse(req.body);
  const { user, game, score } = body;
  console.log(score);
  mysqlConnection.query(
    `INSERT INTO match_history (username, game, score) VALUES (?, ?, ?)`,
    [user, game, score],
    function (error, results) {
      if (error) {
        return res
          .status(400)
          .json({ msg: "Failed to add match", error: error });
      }
      console.log(results);
      return res
        .status(200)
        .json({ msg: "Added new match!", results: results });
    }
  );
}
