import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { Settlement } from 'src/settlement/entity/settlement.entity';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  email: string;

  @Index()
  @Column()
  username: string;

  @Column()
  password: string;

  //   @Column()
  //   avatar: string;

  @OneToMany(() => Group, (group) => group.owner)
  groups: Group[];

  @OneToMany(() => Settlement, (settlement) => settlement.user)
  settlements: Settlement[];
}
