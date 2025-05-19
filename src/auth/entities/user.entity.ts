import { Transaction } from '../../transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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
}
