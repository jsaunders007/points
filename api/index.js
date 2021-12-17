const apiRouter = require("express").Router();
const pointsRouter = require("./pointsRouter");

apiRouter.use("/points", pointsRouter);
apiRouter.get("/health", (req, res) => {
  res.send({ message: "Healthy!" });
});

module.exports = apiRouter;
