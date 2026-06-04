import { Controller, Get, Param } from "@nestjs/common";
import { DatabaseService } from "./db.service";

@Controller("database")
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) { }

    @Get("tables")
    getTables() {
        return this.databaseService.getTables();
    }

    @Get("columns/:tableName")
    getColumns(@Param("tableName") tableName: string) {
        return this.databaseService.getColumns(tableName);
    }
}