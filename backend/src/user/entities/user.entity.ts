import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { Expense } from 'src/expense/entities/expense.entity';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  //   @Column()
  //   avatar: string;

  @OneToMany(() => Group, (group) => group.owner)
  groups: Group[];

  @OneToMany(() => Expense, (expense) => expense.user)
  expense: Expense[];
}
