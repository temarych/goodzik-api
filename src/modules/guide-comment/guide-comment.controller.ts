import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { UserRole } from '@modules/user/enums/user.enum';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { User } from '@modules/user/entities/user.entity';
import { GuideCommentService } from './guide-comment.service';
import { CreateGuideCommentDto } from './dto/create-guide-comment.dto';
import { GuideCommentDto } from './dto/guide-comment.dto';
import { UpdateGuideCommentDto } from './dto/update-guide-comment.dto';

@Controller('guide-comments')
export class GuideCommentController {
  constructor(private readonly guideCommentService: GuideCommentService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a guide comment',
    operationId: 'createGuideComment',
    tags: ['guide-comment'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideCommentDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createGuideComment(
    @Body() data: CreateGuideCommentDto,
    @Req() request,
  ) {
    const user = request.user as User;

    const guideComment = await this.guideCommentService.create({
      ...data,
      guide: { id: data.guideId },
      authorId: user.id,
    });

    return GuideCommentDto.fromEntity(guideComment);
  }

  @Get()
  @ApiOperation({
    summary: 'Get guide comments',
    operationId: 'getGuideComments',
    tags: ['guide-comment'],
  })
  @ApiOkResponse({ type: [GuideCommentDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideComments() {
    const guideComments = await this.guideCommentService.findAll();
    return guideComments.map(GuideCommentDto.fromEntity);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a guide comment',
    operationId: 'getGuideComment',
    tags: ['guide-comment'],
  })
  @ApiOkResponse({ type: GuideCommentDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideComment(@Param('id') id: string) {
    const GuideComment = await this.guideCommentService.findOne(id);
    if (!GuideComment) throw new ApiError(ApiErrorCode.EntityNotFound);
    return GuideCommentDto.fromEntity(GuideComment);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a guide comment',
    operationId: 'updateGuideComment',
    tags: ['guide-comment'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updateGuideComment(
    @Param('id') id: string,
    @Body() data: UpdateGuideCommentDto,
  ) {
    await this.guideCommentService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a guide comment',
    operationId: 'deleteGuideComment',
    tags: ['guide-comment'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteGuideComment(@Param('id') id: string) {
    await this.guideCommentService.delete(id);
  }
}
