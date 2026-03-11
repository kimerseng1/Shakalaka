import { pool } from "@/src/lib/db";

export const movieService = {

  async getMovies() {
    const result = await pool.query("SELECT * FROM movie ORDER BY id DESC");
    return result.rows;
  },

  async createMovie(data: any) {
    const { title, duration, type, subtitle, videoUrl, poster } = data;

    const result = await pool.query(
      `INSERT INTO movie (title, duration, type, subtitle, "videoUrl", poster)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [title, duration, type, subtitle, videoUrl, poster]
    );

    return result.rows[0];
  },

 async updateMovie(id: number, data: any) {
  const { title, duration, type, subtitle, videoUrl, poster } = data;

  // make sure id is number
  if (!id) throw new Error("Movie ID is missing");

  const result = await pool.query(
    `UPDATE movie
     SET title=$1, duration=$2, type=$3, subtitle=$4, "videoUrl"=$5, poster=$6
     WHERE id=$7 RETURNING *`,
    [title, duration, type, subtitle, videoUrl, poster, id]
  );

  if (result.rows.length === 0) {
    throw new Error(`Movie with id=${id} not found`);
  }

  return result.rows[0];
},

  async deleteMovie(id: number) {
    await pool.query("DELETE FROM movie WHERE id=$1", [id]);
  },

};