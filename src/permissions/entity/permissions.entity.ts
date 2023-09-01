import { BaseEntity } from "../../config/base.entity";
import { IPermission } from "../../interfaces/permission.interface";
import { UserPermissionEntity } from "../../user/entity/user-permission.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission extends BaseEntity implements IPermission {
    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @Column()
    isActive: boolean;

    @OneToMany(() => UserPermissionEntity,  userPermissionEntity => userPermissionEntity.permission)
    userToPermission: UserPermissionEntity[]
}