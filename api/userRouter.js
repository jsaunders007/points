const userRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const { getUser } = require("../db/users");

userRouter.post("/login", async (req, res) => {
  const { username } = req.body;
  try {
    console.log(username);
    const user = await getUser({ username });
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
