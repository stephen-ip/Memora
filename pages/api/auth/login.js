const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { serialize } from "cookie";
const uri = process.env.MONGO_DB_URI;

export default function handler(req, res) {
  if (req.method != "POST") return res.json({ error: "request must be POST" });

  const { username, password } = req.body;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect((err) => {
    const users = client.db("hackdavis").collection("users");
    let user_p = users.findOne({ username: username });
    user_p.then(function (user) {
      // check if user with username exists
      if (user === null)
        return res.json({ error: "No user with this username was found" });

      // check to see if password is correct
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === false)
          return res.json({ error: "Password is not correct" });

        // generate user access token
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        //   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        //   refreshTokens.push(refreshToken);
        //   res.json({ accessToken: accessToken, refreshToken: refreshToken });
        return res
          .setHeader(
            "Set-Cookie",
            serialize("token", accessToken, {
              httpOnly: true,
              maxAge: 2592000,
              path: "/",
              sameSite: "Strict",
            })
          )
          .json({ message: "success" });
      });
    });
  });
}
