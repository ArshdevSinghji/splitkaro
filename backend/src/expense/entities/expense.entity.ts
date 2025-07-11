import { Category } from 'src/enum/category.enum';
import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ default: false })
  isPaid: boolean;

  @Column()
  amountToPay: number;

  @ManyToOne(() => Group, (group) => group.expense)
  group: Group;

  @ManyToOne(() => User, (user) => user.expense)
  user: User;
}
