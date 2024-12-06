import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guide } from '@modules/guide/guide.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity()
export class GuideComment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public text: string;

  @ManyToOne(() => Guide, (guide) => guide.comments)
  public guide: Guide;

  @ManyToOne(() => User, (user) => user.comments)
  public author: User;
}
