const client = require("./client");
const { createPoints } = require("./points");
const { createPayer } = require("./users");

async function dropTables() {
  try {
    await client.query(`
        
        
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
            password VARCHAR(255) NOT NULL,
            points INTEGER,
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
      {
        username: "DANNON",
        password: "password123",
        points: 1000,
        date: "2020-11-02T14:00:00Z",
      },
      {
        username: "UNILEVER",
        password: "password123",
        points: 100,
        date: "2020-10-31T11:00:00Z",
      },
      {
        username: "MILLER COORS",
        password: "password123",
        points: 10000,
        date: "2020-11-01T14:00:00Z",
      },
    ];
    const payers = await Promise.all(
      payersToCreate.map(createPayer, createPoints)
    );
    console.log(payers);
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
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = { rebuildDB };
