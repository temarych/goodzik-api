import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userName: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public role: string;
}
