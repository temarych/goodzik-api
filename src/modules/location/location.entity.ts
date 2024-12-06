import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public lat: number;

  @Column()
  public lng: number;

  @Column()
  public contactFullName: string;

  @Column()
  public contactPhoneNumber: string;
}
