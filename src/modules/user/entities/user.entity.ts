import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Guide } from '@modules/guide/guide.entity';
import { GuideComment } from '@modules/guide-comment/guide-comment.entity';
import { UserRole } from '../enums/user.enum';

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

  @Column({ enum: UserRole })
  public role: UserRole;

  @OneToMany(() => Guide, (guide) => guide.author)
  public guides: Guide[];

  @OneToMany(() => GuideComment, (comment) => comment.author)
  public comments: GuideComment[];
}
