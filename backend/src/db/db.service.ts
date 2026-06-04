
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseService {
    constructor(private readonly dataSource: DataSource) { }

    async getTables() {
        return this.dataSource.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    }

    async getColumns(tableName: string) {
        return this.dataSource.query(
            `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = $1
      ORDER BY ordinal_position
      `,
            [tableName],
        );
    }
}
