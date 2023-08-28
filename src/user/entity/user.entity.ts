import { Permission } from "src/permissions/entity/permissions.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @Column({
    nullable: false,
    type: 'varchar',
    length: 150,
    unique: true
  })
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

  @ManyToMany(type => Permission)
  @JoinTable({
    name:'user_permissions',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name:'permission',
      referencedColumnName:'id'
    },
  })
  permissions: Permission[]

}
