import { Command, CommandRunner, Option } from 'nest-commander';
import { exit } from 'process';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreatePaymentRecordDto } from '../payment-plan/dto/create-payment-record.dto';
import { PaymentPlan } from '../payment-plan/entities/payment-plan.entity';
import { PaymentRecord } from '../payment-plan/entities/payment-record.entity';
import {
  seedUsers,
  seedTransactions,
  transactionsWithExistingCategories,
  seedTransactionPlans,
} from '../utils/data';
import { PaymentStatus } from '../utils/enums';
import { Transaction } from '../transaction/entities/transaction.entity';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';

@Command({
  name: 'db',
  description: 'Inserts sample data into the database',
})
export class ScriptsCommand extends CommandRunner {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  @Option({
    flags: '--reset',
    description: 'Deletes the database',
  })
  parseReset(): boolean {
    return true;
  }

  @Option({
    flags: '--seed',
    description: 'Inserts sample data into the database',
  })
  parseSeed(): boolean {
    return true;
  }

  @Option({
    flags: '--all',
    description: 'Delete the database and insert sample data',
  })
  parseAll(): boolean {
    return true;
  }

  async insertData() {
    try {
      console.log('⚠️ Synchronizing Entities...');
      await this.dataSource.synchronize(true).then(async () => {
        console.log(
          'Entities loaded:',
          this.dataSource.entityMetadatas.map((e) => e.name),
        );
      });
      console.log('⚠️ Getting Repositories...');
      const userRepo = this.dataSource.getRepository(User);
      const transactionRepo = this.dataSource.getRepository(Transaction);
      const paymentPlanRepo = this.dataSource.getRepository(PaymentPlan);
      const paymentRecordRepo = this.dataSource.getRepository(PaymentRecord);

      console.log('⚠️ Adding Users...');

      await userRepo.save(seedUsers).then(() => console.log('✅ Users Added'));

      console.log('⚠️ Adding Transactions and Transaction Plans...');
      const cleanTransactions1 = seedTransactions.reduce(
        (acc, dto: CreateTransactionDto) => {
          const transaction = {
            ...dto,
            user: {
              id: dto.userId,
            } as User,
          };

          return [...acc, transaction];
        },
        [] as unknown as Transaction[],
      );
      const cleanTransactions2 = transactionsWithExistingCategories.reduce(
        (acc, dto: CreateTransactionDto) => {
          const transaction = {
            ...dto,
            user: {
              id: dto.userId,
            } as User,
          };

          return [...acc, transaction];
        },
        [] as unknown as Transaction[],
      );
      const cleanPaymentPlans = seedTransactionPlans.map((dto) => {
        return {
          ...dto,
          owner: {
            id: dto.ownerId,
          } as User,
        };
      });

      const [_transactions, _transactions1, paymentPlans] = await Promise.all([
        transactionRepo.save(cleanTransactions1),
        transactionRepo.save(cleanTransactions2),
        paymentPlanRepo.save(cleanPaymentPlans),
      ]);
      console.log('✅ Transactions and Transaction Plans Added');

      console.log('⚠️ Adding Payment Records...');
      await paymentRecordRepo
        .save(
          paymentPlans.map(
            (plan): CreatePaymentRecordDto => ({
              planId: plan.id,
              paymentDate: '2025-05-11T00:00:00.000Z',
              status: PaymentStatus.PENDING,
              amount: Math.random() * plan.totalAmount,
            }),
          ),
        )
        .then(() => console.log('✅ Payment Records Added'));

      console.log('✅ All data has successfully been added');
    } catch (err) {
      console.log(err);
      exit(1);
    }
  }

  async resetData() {
    try {
      console.log('⚠️ Resetting Database...');
      await this.dataSource.dropDatabase();
      console.log('✅ Database Resetted');
    } catch (err) {
      console.log(err);
      exit(1);
    }
  }

  async run(
    _passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const { all, seed, reset } = options;
    const optionsUsed = [all, seed, reset].filter(Boolean);

    if (optionsUsed.length === 0) {
      console.warn(
        '⚠️ Debes pasar al menos una opción: --all, --seed o --reset',
      );
      process.exit(0);
    }

    if (optionsUsed.length > 1) {
      console.error(
        '❌ Solo puedes usar una opción a la vez: --all, --seed o --reset',
      );
      process.exit(1);
    }

    if (options.all) {
      await this.resetData().then(async () => {
        await this.dataSource.synchronize(true);
        await this.insertData();
      });
    }

    options.reset && (await this.resetData());

    if (options.seed) {
      await this.dataSource.synchronize(true);
      await this.insertData();
    }
  }
}
