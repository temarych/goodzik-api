import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GuideCategory } from '@modules/guide-category/guide-category.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  public date: Date;

  @Column()
  public imageUrl: string;

  @ManyToMany(() => GuideCategory, (category) => category.id)
  public categories: GuideCategory[];

  @ManyToOne(() => User, (user) => user.id)
  public author: User;
}
