import { IUser, USER_ROLE } from "../../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { Permission } from "../../permissions/entity/permissions.entity";
import { Column,  Entity,  JoinTable, ManyToMany, OneToMany,} from "typeorm";
import { UserPermissionEntity } from "./user-permission.entity";
import { IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";

@Entity()
export class User extends BaseEntity implements IUser {
  @Column({nullable: false})
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 150,
    unique: true
  })
  email: string;

  @IsNotEmpty()
  @Column({nullable: false})
  phone: string;

  @IsNotEmpty()
  @Column({nullable: false})
  role: USER_ROLE;

  @Exclude()
  @IsNotEmpty()
  @Column({nullable: true})
  password: string;

  // @ManyToMany(type => Permission)
  // @JoinTable({
  //   name:'user_permissions',
  //   joinColumn: {
  //     name: 'user',
  //     referencedColumnName: 'id'
  //   },
  //   inverseJoinColumn: {
  //     name:'permission',
  //     referencedColumnName:'id'
  //   },
  // })

  @OneToMany(() => UserPermissionEntity,  userPermissionEntity => userPermissionEntity.user)
  userToPermission: UserPermissionEntity[];
}
