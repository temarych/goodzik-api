import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiError } from '@modules/error/api-error.entity';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { UserRole } from '@modules/user/enums/user.enum';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { GuideCategoryService } from './guide-category.service';
import { GuideCategoryDto } from './dto/guide-category.dto';
import { CreateGuideCategoryDto } from './dto/create-guide-category.dto';
import { UpdateGuideCategoryDto } from './dto/update-guide-category.dto';

@Controller('guide-categories')
export class GuideCategoryController {
  constructor(private readonly guideCategoryService: GuideCategoryService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a guide category',
    operationId: 'createGuideCategory',
    tags: ['guide-category'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideCategoryDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createGuideCategory(@Body() data: CreateGuideCategoryDto) {
    const guideCategory = await this.guideCategoryService.create(data);
    return GuideCategoryDto.fromEntity(guideCategory);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all guide categories',
    operationId: 'getGuideCategories',
    tags: ['guide-category'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [GuideCategoryDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideCategories() {
    const guideCategories = await this.guideCategoryService.findAll();
    return guideCategories.map(GuideCategoryDto.fromEntity);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get a guide category',
    operationId: 'getGuideCategory',
    tags: ['guide-category'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideCategoryDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideCategory(@Param('id') id: string) {
    const guideCategory = await this.guideCategoryService.findOne(id);
    if (!guideCategory) throw new ApiError(ApiErrorCode.EntityNotFound);
    return GuideCategoryDto.fromEntity(guideCategory);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a guide category',
    operationId: 'updateGuideCategory',
    tags: ['guide-category'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updateGuideCategory(
    @Param('id') id: string,
    @Body() data: UpdateGuideCategoryDto,
  ) {
    await this.guideCategoryService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a guide category',
    operationId: 'deleteGuideCategory',
    tags: ['guide-category'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteGuideCategory(@Param('id') id: string) {
    await this.guideCategoryService.delete(id);
  }
}
