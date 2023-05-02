// check username, password in post(login) request
// if exist create new JWT
// send back t fron-end

// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");

const { BadRequest } = require("../errors");

const login = (req, res) => {
  const { username, password } = req.body;
  //   console.log(username, password);
  if (!username || !password) {
    throw new BadRequest("Please provide  eamil and password");
  }

  //just for demo, normally provided by DB!!!

  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = (req, res) => {
  const user = req.user;
  console.log(user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${user.username}`,
    secret: `Here is your authorization data,your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
