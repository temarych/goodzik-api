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
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { UserRole } from '@modules/user/enums/user.enum';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnerDto } from './dto/partner.dto';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a Partner',
    operationId: 'createPartner',
    tags: ['partner'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: PartnerDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createPartner(@Body() data: CreatePartnerDto) {
    const Partner = await this.partnerService.create(data);
    return PartnerDto.fromEntity(Partner);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a Partner',
    operationId: 'getPartner',
    tags: ['partner'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: PartnerDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getPartner(@Param('id') id: string) {
    const Partner = await this.partnerService.findOne(id);
    if (!Partner) throw new ApiError(ApiErrorCode.EntityNotFound);
    return PartnerDto.fromEntity(Partner);
  }

  @Get()
  @ApiOperation({
    summary: 'Get Partners',
    operationId: 'getPartners',
    tags: ['partner'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [PartnerDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getPartners() {
    const partners = await this.partnerService.findAll();
    return partners.map(PartnerDto.fromEntity);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a Partner',
    operationId: 'updatePartner',
    tags: ['partner'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updatePartner(
    @Param('id') id: string,
    @Body() data: UpdatePartnerDto,
  ) {
    await this.partnerService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a Partner',
    operationId: 'deletePartner',
    tags: ['partner'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deletePartner(@Param('id') id: string) {
    await this.partnerService.delete(id);
  }
}
