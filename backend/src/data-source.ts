import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from './user/entities/user.entity';
import { Group } from './group/entities/group.entity';
import { Expense } from './expense/entities/expense.entity';
import { Settlement } from './settlement/entity/settlement.entity';
import { Notification } from './notification/entity/notification.entity';

config();

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Group, Expense, Settlement, Notification],
  synchronize: true,
  logging: false,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);
