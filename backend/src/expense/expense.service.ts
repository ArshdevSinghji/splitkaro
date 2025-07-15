import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UserService } from 'src/user/user.service';
import { GroupService } from 'src/group/group.service';
import { SettlementService } from 'src/settlement/settlement.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly settlementService: SettlementService,
    private readonly mailerService: MailerService,
  ) {}

  async findOne(expenseId: number) {
    return await this.expenseRepository.findOne({
      where: { id: expenseId },
      relations: ['settlements'],
    });
  }

  async creatingExpenseWithSettlementWithMail(
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

    await Promise.all(
      createExpenseDto.members.map(async (member) => {
        const user = await this.userService.findOne(member);
        if (!user) {
          throw new BadRequestException(`User with email ${member} not found`);
        }

        this.mailerService.sendMail({
          to: user.email,
          from: 'noreply@splitkaro.com',
          subject: 'New Expense Created',
          template: 'notification',
          context: {
            groupName: groupName,
            description: createExpenseDto.description,
            totalAmount: createExpenseDto.totalAmount,
            amountToPay: createExpenseDto.amountToPay?.[member] || 0,
            paidBy: createExpenseDto.paidBy,
          },
        });

        await this.settlementService.create(user, savedExpense, {
          member,
          amountToPay: createExpenseDto?.amountToPay?.[member] || 0,
          isPaid: createExpenseDto.paidBy === member,
        });
      }),
    );

    return savedExpense;
  }

  async deleteExpenseWithSettlementWithMail(
    groupName: string,
    expenseId: number,
  ) {
    const group = await this.groupService.findOne(groupName);
    if (!group) {
      throw new BadRequestException(`Group with name ${groupName} not found`);
    }

    const expense = await this.findOne(Number(expenseId));
    if (!expense) {
      throw new BadRequestException(`Expense with ID ${expenseId} not found`);
    }

    const members = expense.members;
    const expenseData = {
      description: expense.description,
      totalAmount: expense.totalAmount,
      paidBy: expense.paidBy,
    };

    await this.settlementService.deleteByExpenseId(expenseId);

    await this.expenseRepository.remove(expense);

    await Promise.all(
      members.map(async (member) => {
        const user = await this.userService.findOne(member);
        if (user) {
          this.mailerService.sendMail({
            to: user.email,
            from: 'noreply@splitkaro.com',
            subject: 'Expense Deleted',
            template: 'notification',
            context: {
              groupName: groupName,
              description: expenseData.description,
              totalAmount: expenseData.totalAmount,
              paidBy: expenseData.paidBy,
              action: 'deleted',
            },
          });
        }
      }),
    );
    return { message: 'Expense deleted successfully' };
  }
}
