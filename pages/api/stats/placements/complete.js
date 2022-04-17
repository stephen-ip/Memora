const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export default async function handler(req, res) {
  if (req.method != "POST") return res.json({ error: "request must be POST" });
  const { username } = JSON.parse(req.body);
  await client.connect();
  const users = client.db("hackdavis").collection("users");
  const result = await users.updateOne(
    { username: username },
    {
      $set: {
        placementtest: true,
      },
    }
  );
  return res.json({ message: result });
}
