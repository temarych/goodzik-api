import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guide } from '@modules/guide/guide.entity';

@Entity()
export class GuideStep {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToOne(() => Guide, (guide) => guide.categories)
  public guides: Guide[];
}
