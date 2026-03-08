import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  title: string| undefined;

  @Column()
  duration: string| undefined;

  @Column()
  type: string| undefined;

  @Column()
  subtitle: string| undefined;

  @Column()
  videoUrl: string| undefined;
}