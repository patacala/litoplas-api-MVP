import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { User } from "../entity/user.entity";
import { Permission } from "../../permissions/entity/permissions.entity";

export class CreateUserPermissionDto {
    @IsString()
    @ApiProperty()
    accessLevel: string;
  
    @IsNumber()
    @ApiProperty()
    user: User;
  
    @IsNumber()
    @ApiProperty()
    permission: Permission;
}