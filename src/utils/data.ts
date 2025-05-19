import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { TransactionType } from '../transaction/entities/transaction.entity';

export const seedTransactions: CreateTransactionDto[] = [
  {
    name: 'Salary',
    amount: 3000,
    type: TransactionType.INCOME,
    description: 'Monthly salary payment',
    createdAt: '2025-05-01T08:00:00Z',
    category: {
      name: 'Work',
    },
  },
  {
    name: 'Freelance Project',
    amount: 800,
    type: TransactionType.INCOME,
    description: 'Payment for freelance web project',
    createdAt: '2025-05-15T10:00:00Z',
    category: {
      name: 'Freelance',
    },
  },
  {
    name: 'Groceries',
    amount: 150,
    type: TransactionType.EXPENSE,
    description: 'Weekly groceries shopping',
    createdAt: '2025-05-05T16:00:00Z',
    category: {
      name: 'Food',
    },
  },
  {
    name: 'Electricity Bill',
    amount: 100,
    type: TransactionType.EXPENSE,
    description: 'Monthly electricity bill',
    createdAt: '2025-05-07T09:00:00Z',
    category: {
      name: 'Utilities',
    },
  },
  {
    name: 'Internet Bill',
    amount: 60,
    type: TransactionType.EXPENSE,
    description: 'Monthly internet subscription',
    createdAt: '2025-05-07T09:30:00Z',
    category: {
      name: 'Utilities',
    },
  },
  {
    name: 'Gym Membership',
    amount: 40,
    type: TransactionType.EXPENSE,
    description: 'Monthly gym membership fee',
    createdAt: '2025-05-10T18:00:00Z',
    category: {
      name: 'Health',
    },
  },
  {
    name: 'Dinner Out',
    amount: 70,
    type: TransactionType.EXPENSE,
    description: 'Dinner with friends',
    createdAt: '2025-05-12T20:00:00Z',
    category: {
      name: 'Entertainment',
    },
  },
  {
    name: 'Stock Dividends',
    amount: 120,
    type: TransactionType.INCOME,
    description: 'Quarterly dividends received',
    createdAt: '2025-05-20T12:00:00Z',
    category: {
      name: 'Investments',
    },
  },
  {
    name: 'Coffee at Starbucks',
    amount: 5,
    type: TransactionType.EXPENSE,
    description: 'Morning coffee',
    createdAt: '2025-05-18T08:30:00Z',
    category: {
      name: 'Food',
    },
  },
  {
    name: 'Uber Ride',
    amount: 12,
    type: TransactionType.EXPENSE,
    description: 'Ride to work',
    createdAt: '2025-05-17T09:15:00Z',
    category: {
      name: 'Transport',
    },
  },
  {
    name: 'Spotify Subscription',
    amount: 10,
    type: TransactionType.EXPENSE,
    description: 'Monthly music subscription',
    createdAt: '2025-05-16T14:00:00Z',
    category: {
      name: 'Entertainment',
    },
  },
  {
    name: 'Sold Old Phone',
    amount: 150,
    type: TransactionType.INCOME,
    description: 'Selling used iPhone',
    createdAt: '2025-05-16T16:30:00Z',
    category: {
      name: 'Resale',
    },
  },
  {
    name: 'Lunch with Colleague',
    amount: 25,
    type: TransactionType.EXPENSE,
    description: 'Work lunch at local café',
    createdAt: '2025-05-15T13:00:00Z',
    category: {
      name: 'Food',
    },
  },
  {
    name: 'Online Course Sale',
    amount: 200,
    type: TransactionType.INCOME,
    description: 'Revenue from Udemy course',
    createdAt: '2025-05-15T10:45:00Z',
    category: {
      name: 'Freelance',
    },
  },
];

export const transactionsWithExistingCategories: CreateTransactionDto[] = [
  {
    name: 'Salary',
    amount: 3000,
    type: TransactionType.INCOME,
    description: 'Monthly salary payment',
    createdAt: '2025-05-01T08:00:00Z',
    category: {
      id: 1,
      name: 'Work',
    },
  },
  {
    name: 'Freelance Project',
    amount: 800,
    type: TransactionType.INCOME,
    description: 'Payment for freelance web project',
    createdAt: '2025-05-15T10:00:00Z',
    category: {
      id: 2,
      name: 'Freelance',
    },
  },
  {
    name: 'Groceries',
    amount: 150,
    type: TransactionType.EXPENSE,
    description: 'Weekly groceries shopping',
    createdAt: '2025-05-05T16:00:00Z',
    category: {
      id: 3,
      name: 'Food',
    },
  },
  {
    name: 'Electricity Bill',
    amount: 100,
    type: TransactionType.EXPENSE,
    description: 'Monthly electricity bill',
    createdAt: '2025-05-07T09:00:00Z',
    category: {
      id: 4,
      name: 'Utilities',
    },
  },
  {
    name: 'Internet Bill',
    amount: 60,
    type: TransactionType.EXPENSE,
    description: 'Monthly internet subscription',
    createdAt: '2025-05-07T09:30:00Z',
    category: {
      id: 4,
      name: 'Utilities',
    },
  },
  {
    name: 'Gym Membership',
    amount: 40,
    type: TransactionType.EXPENSE,
    description: 'Monthly gym membership fee',
    createdAt: '2025-05-10T18:00:00Z',
    category: {
      id: 5,
      name: 'Health',
    },
  },
  {
    name: 'Dinner Out',
    amount: 70,
    type: TransactionType.EXPENSE,
    description: 'Dinner with friends',
    createdAt: '2025-05-12T20:00:00Z',
    category: {
      id: 6,
      name: 'Entertainment',
    },
  },
  {
    name: 'Stock Dividends',
    amount: 120,
    type: TransactionType.INCOME,
    description: 'Quarterly dividends received',
    createdAt: '2025-05-20T12:00:00Z',
    category: {
      id: 7,
      name: 'Investments',
    },
  },
  {
    name: 'Coffee at Starbucks',
    amount: 5,
    type: TransactionType.EXPENSE,
    description: 'Morning coffee',
    createdAt: '2025-05-18T08:30:00Z',
    category: {
      id: 3,
      name: 'Food',
    },
  },
  {
    name: 'Uber Ride',
    amount: 12,
    type: TransactionType.EXPENSE,
    description: 'Ride to work',
    createdAt: '2025-05-17T09:15:00Z',
    category: {
      id: 8,
      name: 'Transport',
    },
  },
  {
    name: 'Spotify Subscription',
    amount: 10,
    type: TransactionType.EXPENSE,
    description: 'Monthly music subscription',
    createdAt: '2025-05-16T14:00:00Z',
    category: {
      id: 6,
      name: 'Entertainment',
    },
  },
  {
    name: 'Sold Old Phone',
    amount: 150,
    type: TransactionType.INCOME,
    description: 'Selling used iPhone',
    createdAt: '2025-05-16T16:30:00Z',
    category: {
      id: 9,
      name: 'Resale',
    },
  },
  {
    name: 'Lunch with Colleague',
    amount: 25,
    type: TransactionType.EXPENSE,
    description: 'Work lunch at local café',
    createdAt: '2025-05-15T13:00:00Z',
    category: {
      id: 3,
      name: 'Food',
    },
  },
  {
    name: 'Online Course Sale',
    amount: 200,
    type: TransactionType.INCOME,
    description: 'Revenue from Udemy course',
    createdAt: '2025-05-15T10:45:00Z',
    category: {
      id: 2,
      name: 'Freelance',
    },
  },
];

