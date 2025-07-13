import { Category } from 'src/enum/category.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../group/entities/group.entity';

@Entity()
export class GroupDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  members: string[];

  @Column({ nullable: true })
  summary: string;

  @ManyToOne(() => Group, (group) => group.groupDetail)
  group: Group;
}
