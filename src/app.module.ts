import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [UsersModule, ProductsModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
