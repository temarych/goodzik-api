import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';
import { Guide } from './guide.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Guide])],
  controllers: [GuideController],
  providers: [GuideService],
  exports: [TypeOrmModule, GuideService],
})
export class GuideModule {}
