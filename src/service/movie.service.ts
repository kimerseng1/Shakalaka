import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  create(data: Partial<Movie>) {
    const movie = this.movieRepository.create(data);
    return this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Movie>) {
    return this.movieRepository.update(id, data);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
}