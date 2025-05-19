import { User } from 'src/auth/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column('enum', { enum: TransactionType })
  type: TransactionType;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToOne(() => Category, (category) => category.transactions, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  category: Relation<Category>;

  @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
