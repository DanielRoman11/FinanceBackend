import { User } from '../../auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentPlan } from './payment-plan.entity';
import { PaymentStatus } from '../../utils/enums';

@Entity()
export class PaymentRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  amount: number;

  @Column('time without time zone')
  paymentDate: Date;

  @Column('enum', { enum: PaymentStatus })
  status: PaymentStatus;

  @ManyToOne(() => User, (user) => user.ownedPlans, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: Relation<User>;

  @ManyToOne(() => PaymentPlan, (plan) => plan.paymentRecords)
  plan: Relation<PaymentPlan>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
