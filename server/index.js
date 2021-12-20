const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const postOrder = require("./model/posts");
const path = require("path");
const bodyParser = require("body-parser");
const bycryptpass = require("bcryptjs");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// const SECRET = process.env.SECRET || "123456"

mongoose.connect(
  "mongodb+srv://user_003:user1234@cluster0.w8zo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newpass = await bycryptpass.hash(password, 10);
    await User.create({
      email: email,
      password: newpass,
    });
    res.json({ status: "Ok" });
  } catch (err) {
    res.json({ status: "error", error: "Something went wrong" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.json({ status: "error", error: "Invalid credentials" });
  }
  const verify = await bycryptpass.compare(password, user.password);
  if (verify) {
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
        _id: user._id,
      },
      "secret1456"
    );
    res.cookie("token", token, {
      maxAge: 1000000,
    });
    console.log(token);
    // console.log(req.cookies.token)

    return res.json({ status: "Ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/profile", (req, res) => {
  const { email } = req.body._decoded.email;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).send("error in getting database");
    } else {
      if (user) {
        res.send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      } else {
        res.send("user not found");
      }
    }
  });
});

app.get("/api/posts", async (req, res) => {
  try {
    const allposts = await postOrder.find();
    res.status(200).send(allposts);
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

app.post("/api/posts", async (req, res) => {
  const post = req.body;
  const newPost = new postOrder(post);
  try {
    await newPost.save();
    res.status(201).send("Post Saved");
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
});

app.get("/**", (req, res, next) => {
  res.sendFile(path.join(__dirname, "web/build/index.html"));
});

app.listen(5000, () => {
  console.log("Server listening at 5000");
});
