import { Category } from 'src/enum/category.enum';
import { GroupDetail } from 'src/group-detail/entity/groupDetail.entity';
import { Group } from 'src/group/entities/group.entity';
import { Settlement } from 'src/settlement/entity/settlement.entity';
import { User } from 'src/user/entities/user.entity';
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

  @ManyToOne(() => Group, (group) => group.expense)
  group: Group;

  @OneToMany(() => Settlement, (settlement) => settlement.expense)
  settlements: Settlement[];
}
