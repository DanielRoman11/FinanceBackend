import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
	@IsOptional()
	id?: number

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  picture: string;
}
