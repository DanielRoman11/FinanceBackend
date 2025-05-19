import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { DataSource } from 'typeorm';
import {
  seedTransactions,
  seedUsers,
  transactionsWithExistingCategories,
} from './data';
import { exit } from 'process';
import { Transaction } from '../transaction/entities/transaction.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ScriptsService {
  constructor(private readonly dataSource: DataSource) {}

  @Command({
    command: 'db:seed',
    describe: 'Inserts sample data into the database',
  })
  async seedData() {
    try {
      console.log('⚠️ Insertando Datos...');
      const transactionRepo = this.dataSource.getRepository(Transaction);
      const userRepo = this.dataSource.getRepository(User);
      await userRepo.save(seedUsers);

      await Promise.all([
        transactionRepo.save(seedTransactions as any),
        transactionRepo.save(transactionsWithExistingCategories as any),
      ]);

      console.log('✅ Datos Insertados');
      exit(0);
    } catch (err) {
      console.log(err);
      exit(1);
    }
  }

  @Command({
    command: 'db:reset',
    describe: 'Resets the database',
  })
  async resetData() {
    try {
      console.log('⚠️ Resetando Base de Datos...');
      await this.dataSource.dropDatabase();
      console.log('✅ Base de Datos Reseteada');
      exit(0);
    } catch (err) {
      console.log(err);
      exit(1);
    }
  }
}
