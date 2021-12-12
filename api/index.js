const userRouter = require("./userRouter");
const apiRouter = require("express").Router();

apiRouter.use("/user", userRouter);
apiRouter.get("./health", (req, res) => {
  res.send({ message: "Healthy!" });
});

module.exports = apiRouter;
