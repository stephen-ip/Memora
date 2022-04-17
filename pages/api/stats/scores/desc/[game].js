const mysqlConnection = require("../../../connection");

export default function handler(req, res) {
  const { game } = req.query;
  mysqlConnection.query(
    // get the original table where each row contains a unique user and their best scores for each game FIX LOW SCORE BEST SCORE FOR SOME GAMES
    `SELECT username, MIN(score) as score FROM match_history WHERE game = ? GROUP BY username ORDER BY score DESC`,
    game,
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
