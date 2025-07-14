import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsPositive,
  IsString,
} from 'class-validator';
import { Category } from 'src/enum/category.enum';

export class CreateExpenseDto {
  @IsArray()
  @IsString({ each: true })
  members: string[];

  @IsString()
  description: string;

  @IsEnum(Category)
  category: Category;

  @IsInt()
  @IsPositive()
  totalAmount: number;

  @IsString()
  paidBy: string;

  @IsObject()
  amountToPay: { [key: string]: number };
}
