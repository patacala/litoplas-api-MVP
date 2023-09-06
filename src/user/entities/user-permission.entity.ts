import { BaseEntity } from "../../config/base.entity";
import { User } from "./user.entity";
import { Permission } from "../../permissions/entity/permissions.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('user_permission')
export class UserPermissionEntity extends BaseEntity {
    @Column()
    accessLevel: string;

    @ManyToOne( () => User, (user) => user.userToPermission)
    user: User;

    @ManyToOne( () => Permission, (permission) => permission.userToPermission)
    permission: Permission;
}