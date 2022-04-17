const mysqlConnection = require("../../connection");

export default function handler(req, res) {
  const { user } = req.query;
  mysqlConnection.query(
    // gets a table where each row is the user's best match for each game FIX LOW SCORE BEST SCORE FOR SOME GAMES
    `SELECT id, username, game, MAX(score) AS score, timestamp FROM match_history WHERE username = ? and game = 'memorytiles' GROUP BY game`,
    user,
    function (error, results1) {
      if (error) {
        return res
          .status(400)
          .json({ error: "Failed to fetch best scores from user" });
      }
      mysqlConnection.query(
        // gets a table where each row is the user's best match for each game FIX LOW SCORE BEST SCORE FOR SOME GAMES
        `SELECT id, username, game, MIN(score) AS score, timestamp FROM match_history WHERE username = ? and game = 'slidepuzzle' GROUP BY game`,
        user,
        function (error, results2) {
          if (error) {
            return res
              .status(400)
              .json({ error: "Failed to fetch best scores from user" });
          }
          return res.status(200).json({ ...results1, ...results2 });
        }
      );
    }
  );
}
