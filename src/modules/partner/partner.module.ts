import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Partner])],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [TypeOrmModule, PartnerService],
})
export class PartnerModule {}
