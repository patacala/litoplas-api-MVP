import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum USER_ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ROOT = 'ROOT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  email: string;

  @Column({nullable: false})
  phone: string;

  @Column({nullable: false})
  role: USER_ROLE;

  @Column({nullable: true})
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
