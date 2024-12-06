import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public fullName: string;

  @Column()
  public imageUrl: string;

  @Column()
  public position: string;
}
