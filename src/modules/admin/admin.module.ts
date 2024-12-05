import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from '@modules/auth/hash/hash.service';
import { AuthService } from '@modules/auth/auth.service';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    forwardRef(() => AdminModule),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AuthService],
  controllers: [AdminController],
  providers: [AuthService, HashService, UserService],
})
export class AdminModule {}
