const mysqlConnection = require("../../connection");

export default function handler(req, res) {
  mysqlConnection.query(
    // get the original table where each row contains a unique user and their best scores for each game FIX LOW SCORE BEST SCORE FOR SOME GAMES
    `SELECT a.username, SUM(a.score) as score from 
    (SELECT username, MAX(score) as score FROM match_history GROUP BY username, game) AS a
      GROUP BY a.username ORDER BY SCORE DESC`,
    function (error, results) {
      if (error) {
        res.status(400).json({ error: "Failed to fetch scores" });
        res.end();
      }
      res.status(200).json(results);
      res.end();
    }
  );
}

export const config = {
  api: {
    externalResolver: true,
  },
};
