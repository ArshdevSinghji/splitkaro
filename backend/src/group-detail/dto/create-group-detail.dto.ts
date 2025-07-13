import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateGroupDetailDto {
  @IsArray()
  @IsEmail({}, { each: true })
  userEmails: string[];

  @IsString()
  @IsNotEmpty()
  summary: string;
}
