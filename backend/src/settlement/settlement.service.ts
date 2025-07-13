import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Settlement } from './entity/settlement.entity';
import { Repository } from 'typeorm';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Expense } from 'src/expense/entities/expense.entity';
// import { ExpenseService } from 'src/expense/expense.service';

@Injectable()
export class SettlementService {
  constructor(
    @InjectRepository(Settlement)
    private settlementRepository: Repository<Settlement>,
    // private readonly userService: UserService,
    // private readonly expenseService: ExpenseService,
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
}
