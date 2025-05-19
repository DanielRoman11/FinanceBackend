import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async getSummary() {
    return this.dataSource.query(
      `
			SELECT res.* FROM (
				SELECT DISTINCT t.type, sum(t.amount) totalAmount, c.name FROM transaction t
					LEFT JOIN category as c ON c.id = t."categoryId"
					GROUP BY t.type, c.name
					ORDER BY c.name, t."type"
				) res
			ORDER BY res.totalAmount DESC
			`,
    );
  }
}
