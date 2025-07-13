import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserService } from 'src/user/user.service';
import { GroupService } from 'src/group/group.service';
import { SettlementService } from 'src/settlement/settlement.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly settlementService: SettlementService,
  ) {}

  async findOne(expenseId: number) {
    return await this.expenseRepository.findOne({ where: { id: expenseId } });
  }

  async creatingExpenseWWithSettlement(
    groupName: string,
    createExpenseDto: CreateExpenseDto,
  ) {
    const group = await this.groupService.findOne(groupName);
    if (!group) {
      throw new BadRequestException(`Group with name ${groupName} not found`);
    }

    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      group,
    });

    const savedExpense = await this.expenseRepository.save(expense);

    createExpenseDto.members.map(async (member) => {
      const user = await this.userService.findOne(member);
      if (!user) {
        throw new BadRequestException(`User with email ${member} not found`);
      }
      await this.settlementService.create(user, savedExpense, {
        member,
        amountToPay: 50,
        isPaid: createExpenseDto.paidBy === member,
      });
    });

    return savedExpense;
  }
}
