import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const result = user.toObject();
      return {
        _id: result._id,
        username: result.username,
        is_vote: result.is_vote,
      };
    }
    return null;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      _id: user._id,
      is_vote: user.is_vote,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
