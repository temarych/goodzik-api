import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guide } from '@modules/guide/guide.entity';

@Entity()
export class GuideStep {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public order: number;

  @Column()
  public description: string;

  @Column()
  public image: string;

  @ManyToOne(() => Guide, (guide) => guide.steps)
  public guide: Guide;
}
