// import { Pool } from "pg";

// export const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "movie_db",
//   password: "movie1234",
//   port: 5432,
// });
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // load environment variables

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});