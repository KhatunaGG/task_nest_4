import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UsersService } from 'src/users/users.service';




@Injectable()
export class ExpensesService {
  constructor(private usersService: UsersService) {}

  private expenses = [
    { type: 'bread', expense: 2, id: 1, user: 'g@gmail.com' },
  ];



  create(createExpenseDto: CreateExpenseDto, userId: string) {
    const user = this.usersService.findOne(Number(userId))
    if (!createExpenseDto.expense || !createExpenseDto.type)
      throw new HttpException(
        'Type and Expense are required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.expenses[this.expenses.length - 1]?.id || 1;
    const newExpense = {
      id: lastId + 1,
      user: user.email,
      ...createExpenseDto,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }



  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    const existingExpense = this.expenses.find((el) => el.id === id);
    if (!existingExpense)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return existingExpense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    if (!id || !updateExpenseDto.expense || updateExpenseDto.type)
      throw new HttpException(
        'Type and Expense are required',
        HttpStatus.BAD_REQUEST,
      );
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const updatedExpense = {
      ...this.expenses[index],
      ...updateExpenseDto,
    };
    this.expenses[index] = updatedExpense;
    return updatedExpense;
  }

  remove(id: number) {
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const deletedExpense = this.expenses.splice(index, 1);
    return deletedExpense;
  }
}
