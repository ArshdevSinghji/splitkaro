import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settlement } from './entity/settlement.entity';
import { SettlementService } from './settlement.service';
// import { UserModule } from 'src/user/user.module';
// import { ExpenseModule } from 'src/expense/expense.module';

@Module({
  imports: [TypeOrmModule.forFeature([Settlement])],
  providers: [SettlementService],
  exports: [SettlementService],
})
export class SettlementModule {}
