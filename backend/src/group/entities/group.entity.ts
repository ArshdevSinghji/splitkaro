import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { GroupDetail } from '../../group-detail/entity/groupDetail.entity';
import { User } from 'src/user/entities/user.entity';
import { Expense } from 'src/expense/entities/expense.entity';

@Entity()
export class Group {
  @PrimaryColumn({ unique: true })
  groupName: string;

  @Column({ nullable: true })
  groupMember: string;

  @ManyToOne(() => User, (user) => user.groups)
  owner: User;

  @OneToMany(() => GroupDetail, (groupDetail) => groupDetail.group)
  groupDetail: GroupDetail[];

  @OneToMany(() => Expense, (expense) => expense.group)
  expense: Expense[];
}
