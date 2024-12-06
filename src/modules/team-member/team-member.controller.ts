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
import { TeamMemberService } from './team-member.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamMemberDto } from './dto/team-member.dto';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Create a team member',
    operationId: 'createTeamMember',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: TeamMemberDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createTeamMember(@Body() data: CreateTeamMemberDto) {
    const teamMember = await this.teamMemberService.create(data);
    return TeamMemberDto.fromEntity(teamMember);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a team member',
    operationId: 'getTeamMember',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: TeamMemberDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getTeamMember(@Param('id') id: string) {
    const teamMember = await this.teamMemberService.findOne(id);
    if (!teamMember) throw new ApiError(ApiErrorCode.EntityNotFound);
    return TeamMemberDto.fromEntity(teamMember);
  }

  @Get()
  @ApiOperation({
    summary: 'Get team members',
    operationId: 'getTeamMembers',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [TeamMemberDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getTeamMembers() {
    const teamMembers = await this.teamMemberService.findAll();
    return teamMembers.map(TeamMemberDto.fromEntity);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Update a team member',
    operationId: 'updateTeamMember',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async updateTeamMember(
    @Param('id') id: string,
    @Body() data: UpdateTeamMemberDto,
  ) {
    await this.teamMemberService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard([UserRole.Admin]))
  @ApiOperation({
    summary: 'Delete a team member',
    operationId: 'deleteTeamMember',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async deleteTeamMember(@Param('id') id: string) {
    await this.teamMemberService.delete(id);
  }
}
