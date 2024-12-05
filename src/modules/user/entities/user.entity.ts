import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Guide } from '@modules/guide/guide.entity';

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

  @OneToMany(() => Guide, (guide) => guide.author)
  public guides: Guide[];
}
