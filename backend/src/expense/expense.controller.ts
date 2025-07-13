import { Body, Controller, Post, Query } from '@nestjs/common';
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
    return await this.expenseService.creatingExpenseWWithSettlement(
      groupName,
      createExpenseDto,
    );
  }
}
