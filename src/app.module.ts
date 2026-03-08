import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'movie1234',
      database: 'movie_db',
      autoLoadEntities: true, // will automatically load all entities in modules
      synchronize: true,
    }),
    MovieModule, // import the module that handles Movie
  ],
})
export class AppModule {}