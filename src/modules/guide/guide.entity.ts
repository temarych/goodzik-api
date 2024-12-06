import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GuideCategory } from '@modules/guide-category/guide-category.entity';
import { User } from '@modules/user/entities/user.entity';
import { GuideStep } from '@modules/guide-step/guide-step.entity';
import { GuideComment } from '@modules/guide-comment/guide-comment.entity';

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
  public videoUrl: string;

  @Column('text', { array: true })
  public schemas: string[];

  @Column('text', { array: true })
  public exampleImages: string[];

  @OneToMany(() => GuideComment, (comment) => comment.guide)
  public comments: GuideComment[];

  @ManyToMany(() => GuideCategory, (category) => category.guides)
  @JoinTable()
  public categories: GuideCategory[];

  @OneToMany(() => GuideStep, (step) => step.guides)
  public steps: GuideStep[];

  @ManyToOne(() => User, (user) => user.guides)
  public author: User;
}
