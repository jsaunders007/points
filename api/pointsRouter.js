const {
  addPointsToPayer,
  spendOldestPoints,
  pointsBalance,
} = require("../db/points");

const pointsRouter = require("express").Router();

// I was not sucessful with this route, any feedback would be appreciated!

pointsRouter.post("/add", async (req, res) => {
  try {
    const { id, points } = req.body;
    const resp = await addPointsToPayer(id, points);
    return res.send(resp);
  } catch (error) {
    throw error;
  }
});

// I was not so sucessful on this route, and feedback would be appreciated!

pointsRouter.post("/spend", async (req, res) => {
  try {
    const { id, points, date } = req.body;
    const resp = await spendOldestPoints(id, points, date);
    return res.send(resp);
  } catch (error) {
    throw error;
  }
});

// I was able to sucessfully get the balance of the points.

pointsRouter.get("/balance", async (req, res) => {
  try {
    const { id } = req.body;
    const resp = await pointsBalance(id);
    return res.send(resp);
  } catch (error) {
    throw error;
  }
});

module.exports = pointsRouter;
