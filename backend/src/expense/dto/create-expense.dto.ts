import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsPositive,
  IsString,
} from 'class-validator';
import { Category } from 'src/enum/category.enum';

export class CreateExpenseDto {
  @IsString()
  @IsArray()
  members: string[];

  @IsString()
  description: string;

  @IsEnum({ enum: Category })
  category: Category;

  @IsInt()
  @IsPositive()
  totalAmount: number;

  @IsString()
  paidBy: string;
}
