import { movieService } from "@/src/services/movie.service";

export const movieController = {

  async getMovies() {
    return await movieService.getMovies();
  },

  async createMovie(data: any) {
    return await movieService.createMovie(data);
  },

  async updateMovie(id: number, data: any) {
    return await movieService.updateMovie(id, data);
  },

  async deleteMovie(id: number) {
    return await movieService.deleteMovie(id);
  },

};