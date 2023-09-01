import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdatePermissionDto {
  
    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}