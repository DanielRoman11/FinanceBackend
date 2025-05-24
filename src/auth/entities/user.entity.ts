import { PaymentRecord } from '../../payment-plan/entities/payment-record.entity';
import { PaymentPlan } from '../../payment-plan/entities/payment-plan.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  picture: string;

  @OneToMany(() => Transaction, (tr) => tr.user, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  transactions: Relation<Transaction[]>;

  @OneToMany(() => PaymentRecord, (record) => record.user, { nullable: true })
  paymentRecords: Relation<PaymentRecord[]>;

  @OneToMany(() => PaymentPlan, (plan) => plan.owner, { nullable: true })
  ownedPlans: Relation<PaymentPlan[]>;

  @ManyToMany(() => PaymentPlan, (plans) => plans.collaborators, {
    nullable: true,
  })
  sharedPlans: Relation<User[]>;
}
