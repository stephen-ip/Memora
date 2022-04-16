const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export default async function handler(req, res) {
  const token = req.cookies.token || "";
  if (token == null) return res.json({ error: "no token provided" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.json({ error: err });
    await client.connect();
    const users = client.db("hackdavis").collection("users");
    const userUpdated = await users.findOne({ username: user.username });
    if (userUpdated) {
      delete userUpdated.password;
    }
    res.json({ user: userUpdated });
    res.end();
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};