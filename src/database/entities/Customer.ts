import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class CustomerDatabase {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;
}
