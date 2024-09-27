import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, UsersService],
})
export class ExpensesModule {}
