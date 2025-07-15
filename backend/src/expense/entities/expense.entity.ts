import { Category } from 'src/enum/category.enum';
import { Group } from 'src/group/entities/group.entity';
import { Settlement } from 'src/settlement/entity/settlement.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  members: string[];

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column()
  totalAmount: number;

  @Column()
  paidBy: string;

  @ManyToOne(() => Group, (group) => group.expense, { cascade: true })
  group: Group;

  @OneToMany(() => Settlement, (settlement) => settlement.expense, {
    cascade: true,
  })
  settlements: Settlement[];
}
