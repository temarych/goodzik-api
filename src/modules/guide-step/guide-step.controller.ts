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
import { AuthGuard } from '@modules/auth/auth.guard';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { GuideStepService } from './guide-step.service';
import { GuideStepDto } from './dto/guide-step.dto';
import { CreateGuideStepDto } from './dto/create-guide-step.dto';
import { UpdateGuideStepDto } from './dto/update-guide-step.dto';

@Controller('guide-steps')
export class GuideStepController {
  constructor(private readonly guideStepService: GuideStepService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create a guide Step',
    operationId: 'createGuideStep',
    tags: ['guide-Step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideStepDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createGuideStep(@Body() data: CreateGuideStepDto) {
    const guideStep = await this.guideStepService.create(data);
    return GuideStepDto.fromEntity(guideStep);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get all guide steps',
    operationId: 'getGuideSteps',
    tags: ['guide-Step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [GuideStepDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuideCategories() {
    const guideCategories = await this.guideStepService.findAll();
    return guideCategories.map(GuideStepDto.fromEntity);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get a guide Step',
    operationId: 'getGuideStep',
    tags: ['guide-Step'],
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
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update a guide Step',
    operationId: 'updateGuideStep',
    tags: ['guide-Step'],
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
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Delete a guide Step',
    operationId: 'deleteGuideStep',
    tags: ['guide-Step'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteGuideStep(@Param('id') id: string) {
    await this.guideStepService.delete(id);
  }
}
