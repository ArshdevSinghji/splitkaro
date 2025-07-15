import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async createExpense(
    @Query() query: { groupName: string },
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    const { groupName } = query;
    return await this.expenseService.creatingExpenseWithSettlementWithMail(
      groupName,
      createExpenseDto,
    );
  }

  @Delete()
  async deleteExpense(
    @Query() query: { groupName: string; expenseId: number },
  ) {
    const { groupName, expenseId } = query;
    return await this.expenseService.deleteExpenseWithSettlementWithMail(
      groupName,
      expenseId,
    );
  }
}
