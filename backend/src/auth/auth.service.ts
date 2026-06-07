import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly dataSource: DataSource) {}

  async login(username: string, password: string) {
    const users = await this.dataSource.query(
      `SELECT id, username, password_hash, user_role,
          first_name, last_name
   FROM employees
   WHERE username = $1
   LIMIT 1`,
      [username],
    );

    const user = users[0];

    if (!user || user.password_hash !== password) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.user_role,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
}
