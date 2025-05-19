import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async getSummary(user: User) {
    return this.dataSource.query(
      `
			SELECT res.* FROM (
				SELECT DISTINCT
					t.type,
					sum(t.amount) totalAmount,
					c.name,
					u.username
				FROM transaction t
				LEFT JOIN category as c ON c.id = t."categoryId"
				LEFT JOIN "user" as u ON u.id = t."userId"
				WHERE u.id = $1
				GROUP BY t.type, c.name, u.username
				ORDER BY c.name, t."type"
			) res
			ORDER BY res.totalAmount DESC;
			`,
      [user.id],
    );
  }
}
