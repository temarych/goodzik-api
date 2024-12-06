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

  @ManyToMany(() => GuideCategory, (category) => category.guides)
  @JoinTable()
  public categories: GuideCategory[];

  @OneToMany(() => GuideStep, (step) => step.guides)
  public steps: GuideStep[];

  @ManyToOne(() => User, (user) => user.id)
  public author: User;
}
