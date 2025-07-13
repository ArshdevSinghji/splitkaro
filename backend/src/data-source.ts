import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from './user/entities/user.entity';
import { Group } from './group/entities/group.entity';
import { GroupDetail } from './group-detail/entity/groupDetail.entity';
import { Expense } from './expense/entities/expense.entity';
import { Settlement } from './settlement/entity/settlement.entity';

config();

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Group, GroupDetail, Expense, Settlement],
  synchronize: true,
  logging: false,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);
