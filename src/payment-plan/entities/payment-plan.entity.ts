import {
  Currency,
  PaymentInterval,
  PaymentPlanStatus,
} from '../../utils/enums';
import { User } from '../../auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { PaymentRecord } from './payment-record.entity';

@Entity()
export class PaymentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('decimal', { scale: 2 })
  totalAmount: number;

  @Column('enum', { enum: PaymentPlanStatus })
  status: PaymentPlanStatus;

  @Column('enum', { enum: Currency })
  currency: Currency;

  @Column('enum', { enum: PaymentInterval })
  interval: PaymentInterval;

  @OneToMany(() => PaymentRecord, (record) => record.plan)
  paymentRecords: Relation<PaymentRecord[]>;

  @ManyToOne(() => User, (user) => user.ownedPlans)
  owner: Relation<User>;

  @ManyToMany(() => User, (user) => user.sharedPlans)
  @JoinColumn()
  collaborators: Relation<User[]>;

  @CreateDateColumn()
  createdAt: Date;
}
