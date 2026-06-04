import { Module } from "@nestjs/common";
import { DatabaseService } from "./db.service";
import { DatabaseController } from "./db.controller";

@Module({
    controllers: [DatabaseController],
    providers: [DatabaseService],
})
export class DatabaseModule { }