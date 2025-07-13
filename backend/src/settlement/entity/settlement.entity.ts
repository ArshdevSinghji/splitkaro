import { Expense } from 'src/expense/entities/expense.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Settlement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  member: string;

  @Column()
  amountToPay: number;

  @Column({ default: false })
  isPaid: boolean;

  @ManyToOne(() => Expense, (expense) => expense.settlements)
  expense: Expense;

  @ManyToOne(() => User, (user) => user.settlements)
  user: User;
}
