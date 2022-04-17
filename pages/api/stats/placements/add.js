const mysqlConnection = require("../../connection");

export default function handler(req, res) {
  const body = JSON.parse(req.body);
  const { user, game, score } = body;
  mysqlConnection.query(
    `UPDATE placementscores SET ?? = ? WHERE username = ?`,
    [game, score, user],
    function (error, results) {
      if (error) {
        return res
          .status(400)
          .json({ msg: "Failed to add placement score", error: error });
      }
      return res
        .status(200)
        .json({ msg: "Added new placement score", results: results });
    }
  );
}
