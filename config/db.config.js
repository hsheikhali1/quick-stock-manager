const dotenv = require("dotenv");

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASE = process.env.DB_NAME;

if (!USERNAME || !PASSWORD) {
  throw new Error(
    "Cannot connect to the database without a valid Username and Password.",
  );
}

if (!DATABASE) {
  throw new Error(
    "Cannot connect to an undefined database name. Please make sure there is a valid .env file with valid variables",
  );
}

module.exports = {
  host: "localhost",
  user: USERNAME,
  password: PASSWORD,
  db: DATABASE,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
