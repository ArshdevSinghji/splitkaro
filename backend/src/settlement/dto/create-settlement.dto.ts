import { IsBoolean, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateSettlementDto {
  @IsString()
  member: string;

  @IsInt()
  @IsPositive()
  amountToPay: number;

  @IsBoolean()
  isPaid: boolean;
}
