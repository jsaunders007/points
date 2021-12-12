const client = require("./client");
const { createPayer } = require("./users");

async function dropTables() {
  try {
    await client.query(`
        DROP TABLE IF EXISTS timestamp;
        DROP TABLE IF EXISTS points;
        DROP TABLE IF EXISTS payer;
        `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Creating Tables");
    await client.query(`
        CREATE TABLE payer (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE points (
            count INTEGER
        );
        CREATE TABLE timestamp (
            date VARCHAR(255) UNIQUE NOT NULL
        );
        `);
  } catch (error) {
    throw error;
  }
}

async function createInitialPayers() {
  try {
    const payersToCreate = [
      { username: "DANNON", password: "password123" },
      { username: "UNILEVER", password: "password123" },
      { username: "MILLER COORS", password: "password123" },
    ];
    const payers = await Promise.all(payersToCreate.map(createPayer));
    console.log(payers);
  } catch (error) {
    throw error;
  }
}

async function createInitialPoints() {
  try {
    const pointsToCreate = [
      { points: 1000 },
      { points: 100 },
      { points: 200 },
      { points: 10000 },
      { points: 300 },
    ];
  } catch (error) {
    throw error;
  }
}

async function createInitialTimestamp() {
  try {
    const timestampsToCreate = [
      { timestamp: "2020-11-02T14:00:00Z" },
      { timestamp: "2020-10-31T11:00:00Z" },
      { timestamp: "2020-10-31T15:00:00Z" },
      { timestamp: "2020-11-01T14:00:00Z" },
      { timestamp: "2020-10-31T10:00:00Z" },
    ];
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialPayers();
    await createInitialPoints();
    await createInitialTimestamp();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = { rebuildDB };
