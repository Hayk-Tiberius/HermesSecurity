import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:4242",
  });
  app.setGlobalPrefix("api");
  await app.listen(4242);

  console.log("Server started: http://localhost:4242");
}

bootstrap();