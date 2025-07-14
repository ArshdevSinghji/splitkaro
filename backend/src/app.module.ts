import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { HashModule } from './hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { GroupModule } from './group/group.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    HashModule,
    AuthModule,
    GroupModule,
    ExpenseModule,
  ],
})
export class AppModule {}
