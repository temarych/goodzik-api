import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user/user.module';
import { UserService } from '@modules/user/user.service';
import { User } from '@modules/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashService } from './hash/hash.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, HashService, UserService],
})
export class AuthModule {}
