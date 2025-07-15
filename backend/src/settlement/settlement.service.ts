import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Settlement } from './entity/settlement.entity';
import { Repository } from 'typeorm';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { User } from 'src/user/entities/user.entity';
import { Expense } from 'src/expense/entities/expense.entity';

@Injectable()
export class SettlementService {
  constructor(
    @InjectRepository(Settlement)
    private settlementRepository: Repository<Settlement>,
  ) {}

  async create(
    user: Partial<User>,
    expense: Partial<Expense>,
    createSettlementDto: CreateSettlementDto,
  ) {
    const settlement = this.settlementRepository.create({
      ...createSettlementDto,
      expense,
      user,
    });
    return await this.settlementRepository.save(settlement);
  }

  async deleteByExpenseId(expenseId: number) {
    const settlements = await this.settlementRepository.find({
      where: { expense: { id: expenseId } },
    });

    if (settlements.length > 0) {
      return await this.settlementRepository.remove(settlements);
    }

    return { affected: 0 };
  }
}
