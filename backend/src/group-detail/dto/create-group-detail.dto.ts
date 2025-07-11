import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Category } from 'src/enum/category.enum';

export class CreateGroupDetailDto {
  @IsArray()
  @IsEmail({}, { each: true })
  userEmails: string[];

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsEnum(Category)
  category: Category;
}
