const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");
const uri = process.env.MONGO_DB_URI;
const mysqlConnection = require("../connection");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const clientTwilio = require("twilio")(accountSid, authToken);
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
rule.hour = 11;

export default function handler(req, res) {
  if (req.method != "POST") return res.json({ error: "request must be POST" });

  const { firstname, lastname, email, username, password, passwordConfirm, age, phone, sms, countrycode } =
    req.body; 

  // verify username length
  if (username.length < 3 || username.length > 20)
    return res.json({ error: "Username must be between 3 and 20 characters" });

  // verify passwords match
  if (password !== passwordConfirm)
    return res.json({ error: "Passwords do not match" });

  // connect to db
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect((err) => {
    if (err) return res.json({ error: "Error connecting to db" });
    const users = client.db("hackdavis").collection("users");
    let user_p = users.findOne({ username: username });
    user_p.then(function (user) {
      // check if user with same username is already in db
      if (user != null) {
        return res.json({
          error: "A user with the username provided already exists",
        });
      }

      // if not, add user to database with encrypted password
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) return res.json({ error: "Error hashing password" });
        user = {  // ADD SMS, AGE, SCHOOL, PHONENUMBER
          firstname: firstname,
          lastname: lastname,
          email: email,
          phonenumber: phone,  // FIXME
          sms: sms,  // FIX ME
          username: username,
          password: hash,
          placementtest: false,
          pfpurl:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        };
        let result_p = users.insertOne(user);
        result_p.then(function (result) {
          mysqlConnection.query(
            `INSERT INTO placementscores (username)
          VALUES (?)`,
            user.username,
            function (error, _) {
              if (error) {
                console.log(
                  "Failed to add user to placementscores table",
                  error
                );
              } else {
                console.log("User added successfully to placementscores table");
              }
            }
          );
          // sign user up for twilio if checked box
          // const job = schedule.scheduleJob(rule, function () {
          //   const sendWhen = new Date(new Date().getTime() + 61 * 60000); // 61 min
          //   clientTwilio.messages
          //     .create({
          //       messagingServiceSid: messagingServiceSid,
          //       body: `Hi ${user.username}, remember to log on to memora and get your daily mental exercise!`,
          //       to: user.phonenumber,
          //       scheduleType: "fixed",
          //       sendAt: sendWhen.toISOString(),
          //     })
          //     .then((message) => {
          //       console.log("twilio message:", message);
          //     })
          //     .catch((error) => {
          //       console.log("twilio error:", error);
          //     });
          // });
          return res.json(result);
        });
      });
    });
  });
}
