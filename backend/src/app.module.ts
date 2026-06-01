import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./user/user.module";
// import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./user/user.service";
// import { DatabaseModule } from "../database/db.module";

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   host: "mysql104.1gb.ru",
    //   port: 3306,
    //   username: "gb_gbpss2",
    //   password: "B-h9TzRRESXR",
    //   database: "gb_gbpss2",

    //   autoLoadEntities: true,

    //   synchronize: false,
    // }),
    // DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule {}