const client = require("./client");
const bcrypt = require("bcrypt");

async function createPayer({ username, password, points, date }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO payer (username, password, points, date)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [username, hashedPassword, points, date]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log("error creating user");
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const resp = await client.query(
      `
        SELECT * FROM payer
        WHERE username = $1
        `,
      [username]
    );
    const user = resp.rows[0];
    if (await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { createPayer, getUser };
