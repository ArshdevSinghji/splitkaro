import { Settlement } from 'src/settlement/entity/settlement.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isRead: boolean;

  @OneToOne(() => Settlement, (settlement) => settlement.notification)
  settlement: Settlement;
}
