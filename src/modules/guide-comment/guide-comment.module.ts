import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { GuideCommentController } from './guide-comment.controller';
import { GuideCommentService } from './guide-comment.service';
import { GuideComment } from './guide-comment.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([GuideComment])],
  controllers: [GuideCommentController],
  providers: [GuideCommentService],
  exports: [TypeOrmModule, GuideCommentService],
})
export class GuideCommentModule {}
