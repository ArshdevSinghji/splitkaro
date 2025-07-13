import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense } from './entities/expense.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';
import { SettlementModule } from 'src/settlement/settlement.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    GroupModule,
    UserModule,
    SettlementModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
