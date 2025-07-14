import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense } from './entities/expense.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';
import { SettlementModule } from 'src/settlement/settlement.module';
import { UserModule } from 'src/user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.EMAIL_HOST || 'localhost',
          port: parseInt(process.env.EMAIL_PORT || '1025'),
          secure: false,
          ignoreTLS: true,
        },
        defaults: {
          from: '"SplitKaro App" <noreply@splitkaro.com>',
        },
        preview: true,
        template: {
          dir: join(process.cwd(), 'src', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    GroupModule,
    UserModule,
    SettlementModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
