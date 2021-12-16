const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUser } = require("../db/users");

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(username, password);
    const user = await getUser({ username, password });
    console.log(user, "user");
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    res.send({ message: "You are signed in", token: token });
  } catch (error) {
    res.status(409).send("incorrect information");
  }
});

userRouter.get("/me", (req, res, next) => {
  if (req.user) {
    return res.send(req.user);
  }
  req.status(401).send("You are not logged in");
});

module.exports = userRouter;
