import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { GuideStep } from '@modules/guide-step/guide-step.entity';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';
import { Guide } from './guide.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Guide, GuideStep])],
  controllers: [GuideController],
  providers: [GuideService],
  exports: [TypeOrmModule, GuideService],
})
export class GuideModule {}
