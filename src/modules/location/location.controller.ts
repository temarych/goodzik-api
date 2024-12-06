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
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDto } from './dto/location.dto';
import { LocationService } from './location.service';

@Controller('Locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a location',
    operationId: 'createLocation',
    tags: ['Location'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: LocationDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createLocation(@Body() data: CreateLocationDto) {
    const Location = await this.locationService.create(data);
    return LocationDto.fromEntity(Location);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get a location',
    operationId: 'getLocation',
    tags: ['Location'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: LocationDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getLocation(@Param('id') id: string) {
    const Location = await this.locationService.findOne(id);
    if (!Location) throw new ApiError(ApiErrorCode.EntityNotFound);
    return LocationDto.fromEntity(Location);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get locations',
    operationId: 'getLocations',
    tags: ['Location'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [LocationDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getLocations() {
    const Locations = await this.locationService.findAll();
    return Locations.map(LocationDto.fromEntity);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a location',
    operationId: 'updateLocation',
    tags: ['Location'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updateLocation(
    @Param('id') id: string,
    @Body() data: UpdateLocationDto,
  ) {
    await this.locationService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a location',
    operationId: 'deleteLocation',
    tags: ['Location'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteLocation(@Param('id') id: string) {
    await this.locationService.delete(id);
  }
}
