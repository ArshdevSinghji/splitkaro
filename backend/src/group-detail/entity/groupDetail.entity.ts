import { Category } from 'src/enum/category.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class GroupDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  userEmails: string[];

  @Column()
  summary: string;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @ManyToOne(() => Group, (group) => group.groupDetail)
  group: Group;
}
