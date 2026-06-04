import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./user/user.service";
import { DatabaseModule } from "./db/db.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "vonSaschen",
      database: "postgres",

      autoLoadEntities: true,

      synchronize: false,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule { }