const mysqlConnection = require("../../connection");

export default function handler(req, res) {
  mysqlConnection.query("SELECT * FROM match_history", function (error, results) {
    if (error) {
      return res.status(400).json({ error: "Failed to fetch all match history" });
    }
    return res.status(200).json(results);
  });
}
