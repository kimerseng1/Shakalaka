import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movie_db",
  password: "movie1234",
  port: 5432,
});