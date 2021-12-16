const client = require("./client");

async function createPoints({ points, date }) {
  try {
    const resp = await client.query(
      `
       INSERT INTO points (points, date)
       VALUES ($1, $2)
       RETURNING *;
       `,
      [points, date]
    );
    return resp.rows[0];
  } catch (error) {
    throw error;
  }
}

async function getAllPoints() {
  try {
    const resp = await client.query(`
        SELECT * FROM points
        `);
    const data = resp.rows;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getPointsById(id) {
  try {
    const resp = await client.query(
      `
        SELECT * FROM points WHERE id = $1
        `,
      [id]
    );
    const data = resp.rows[0];
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

async function getOldestPointsByUsername(user_id) {
  try {
    const resp = await client.query(
      `
        SELECT payer.username, latest_points.date
        FROM (SELECT user_id, MAX(date) AS date
        FROM points
        GROUP BY user_id) AS latest_points
        INNER JOIN payer ON payer.id = latest_points.user_id
        `,
      [user_id]
    );
    const data = resp.rows[0];
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPoints,
  getAllPoints,
  getPointsById,
  getOldestPointsByUsername,
};
