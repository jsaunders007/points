const client = require("./client");

// This first function gets the oldest points by using the username, and allows the api route to use those old points first.
console.log("hi");
async function getOldestPointsByUsername(user_id) {
  console.log("how are you?");
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

// This function adds points to a specific user as if that user gained more reward points for shopping online.

async function addPointsToPayer({ id, points }) {
  try {
    const resp = await client.query(
      `
      UPDATE payer SET points = $2
      WHERE id = $1;
      `,
      [id, points]
    );
    const data = resp.rows[0];
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

// This function allows the api route to spend the oldest points first for each user.

async function spendOldestPoints({ id, points, date }) {
  try {
    const resp = await client.query(
      `
      SELECT (id, points, date)
      FROM (SELECT id, points, date, 
        rank() OVER (PARTITION BY id ORDER BY date) AS rk)
        AS subq
        WHERE rk = 1
      `,
      [id, points, date]
    );
    const data = resp.rows;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

// This function gives the user an updated balance of their reward points.

async function pointsBalance(id) {
  console.log("hi");
  try {
    const resp = await client.query(
      `
SELECT points FROM payer
WHERE id = $1
     `,
      [id]
    );
    const data = resp.rows;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOldestPointsByUsername,
  spendOldestPoints,
  pointsBalance,
  addPointsToPayer,
};
