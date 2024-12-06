import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Guide } from '@modules/guide/guide.entity';

@Entity()
export class GuideCategory {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToMany(() => Guide, (guide) => guide.categories)
  public guides: Guide[];
}
