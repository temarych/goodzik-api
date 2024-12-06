import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { GuideStep } from './guide-step.entity';
import { GuideStepService } from './guide-step.service';
import { GuideStepController } from './guide-step.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([GuideStep])],
  controllers: [GuideStepController],
  providers: [GuideStepService],
  exports: [TypeOrmModule, GuideStepService],
})
export class GuideStepModule {}
