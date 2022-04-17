const mysqlConnection = require("../../connection");

export default function handler(req, res) {
  const { user } = req.query;
  mysqlConnection.query(
    `SELECT * FROM match_history WHERE username = ?`,
    user,
    function (error, results) {
      if (error) {
        return res.status(400).json({ error: "Failed to fetch match history" });
      }
      return res.status(200).json(results);
    }
  );
}
