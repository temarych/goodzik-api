import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;
}
