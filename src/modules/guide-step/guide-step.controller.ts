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
import { GuideStepService } from './guide-step.service';
import { GuideStepDto } from './dto/guide-step.dto';
import { CreateGuideStepDto } from './dto/create-guide-step.dto';
import { UpdateGuideStepDto } from './dto/update-guide-step.dto';

@Controller('guide-steps')
export class GuideStepController {
  constructor(private readonly guideStepService: GuideStepService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a guide step',
    operationId: 'createGuideStep',
    tags: ['guide-step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideStepDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createGuideStep(@Body() data: CreateGuideStepDto) {
    const guideStep = await this.guideStepService.create(data);
    return GuideStepDto.fromEntity(guideStep);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all guide steps',
    operationId: 'getGuideSteps',
    tags: ['guide-step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [GuideStepDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideCategories() {
    const guideCategories = await this.guideStepService.findAll();
    return guideCategories.map(GuideStepDto.fromEntity);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a guide step',
    operationId: 'getGuideStep',
    tags: ['guide-step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideStepDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideStep(@Param('id') id: string) {
    const guideStep = await this.guideStepService.findOne(id);
    if (!guideStep) throw new ApiError(ApiErrorCode.EntityNotFound);
    return GuideStepDto.fromEntity(guideStep);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a guide step',
    operationId: 'updateGuideStep',
    tags: ['guide-step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updateGuideStep(
    @Param('id') id: string,
    @Body() data: UpdateGuideStepDto,
  ) {
    await this.guideStepService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a guide step',
    operationId: 'deleteGuideStep',
    tags: ['guide-step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteGuideStep(@Param('id') id: string) {
    await this.guideStepService.delete(id);
  }
}
