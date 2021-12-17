const {
  addPointsToPayer,
  spendOldestPoints,
  pointsBalance,
} = require("../db/points");

const pointsRouter = require("express").Router();

pointsRouter.post("/add-points", async (req, res) => {
  try {
    const { id, points } = req.body;
    const resp = await addPointsToPayer(id, points);
    return res.send(resp);
  } catch (error) {
    throw error;
  }
});

pointsRouter.post("/spend-points", async (req, res) => {
  try {
    const { id, points, date } = req.body;
    const resp = await spendOldestPoints(id, points, date);
    return res.send(resp);
  } catch (error) {
    throw error;
  }
});

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
