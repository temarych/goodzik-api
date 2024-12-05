import { Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { GuideCategory } from '@modules/guide-category/guide-category.entity';
import { Guide } from '../guide.entity';

export class GuideDto {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column('timestamp')
  public date: Date;

  @Column()
  public imageUrl: string;

  @ManyToMany(() => GuideCategory, (category) => category.id)
  public categories: GuideCategory[];

  @ManyToOne(() => User, (user) => user.id)
  public author: User;

  public static fromEntity(entity: Guide): GuideDto {
    const dto = new GuideDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.date = entity.date;
    dto.imageUrl = entity.imageUrl;

    return dto;
  }
}
