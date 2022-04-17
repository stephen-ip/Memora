const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export default async function handler(req, res) {
  const { username } = req.query;
  if (req.method != "GET") return res.json({ error: "request must be GET" });
  await client.connect();
  const users = client.db("hackdavis").collection("users");
  let user = await users.findOne({ username: username });
  if (user) {
    delete user.password;
  }
  return res.json({ user: user });
}
