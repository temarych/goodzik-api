import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { GuideCategory } from './guide-category.entity';
import { GuideCategoryService } from './guide-category.service';
import { GuideCategoryController } from './guide-category.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([GuideCategory])],
  controllers: [GuideCategoryController],
  providers: [GuideCategoryService],
  exports: [TypeOrmModule, GuideCategoryService],
})
export class GuideCategoryModule {}
