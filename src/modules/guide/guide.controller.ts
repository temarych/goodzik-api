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
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { GuideDto } from './dto/guide.dto';
import { GuideDetailsDto } from './dto/guide-details.dto';

@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a guide',
    operationId: 'createGuide',
    tags: ['guide'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: GuideDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createGuide(@Body() data: CreateGuideDto, @Req() request) {
    const user = request.user as User;

    const guide = await this.guideService.create({
      ...data,
      authorId: user.id,
    });

    return GuideDto.fromEntity(guide);
  }

  @Get()
  @ApiOperation({
    summary: 'Get guides',
    operationId: 'getGuides',
    tags: ['guide'],
  })
  @ApiOkResponse({ type: [GuideDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuides() {
    const guides = await this.guideService.findAll();
    console.log(guides);
    return guides.map(GuideDto.fromEntity);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a guide',
    operationId: 'getGuide',
    tags: ['guide'],
  })
  @ApiOkResponse({ type: GuideDetailsDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getGuide(@Param('id') id: string) {
    const guide = await this.guideService.findOne(id);
    if (!guide) throw new ApiError(ApiErrorCode.EntityNotFound);
    return GuideDetailsDto.fromEntity(guide);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a guide',
    operationId: 'updateGuide',
    tags: ['guide'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updateGuide(
    @Param('id') id: string,
    @Body() data: UpdateGuideDto,
  ) {
    await this.guideService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a guide',
    operationId: 'deleteGuide',
    tags: ['guide'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteGuide(@Param('id') id: string) {
    await this.guideService.delete(id);
  }
}
