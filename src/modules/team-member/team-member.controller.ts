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
import { AuthGuard } from '@modules/auth/auth.guard';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { TeamMemberService } from './team-member.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamMemberDto } from './dto/team-member.dto';

@Controller('TeamMembers')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create a team member',
    operationId: 'createTeamMember',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: TeamMemberDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async createTeamMember(@Body() data: CreateTeamMemberDto) {
    const TeamMember = await this.teamMemberService.create(data);
    return TeamMemberDto.fromEntity(TeamMember);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get a team member',
    operationId: 'getTeamMember',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: TeamMemberDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getTeamMember(@Param() id: string) {
    const TeamMember = await this.teamMemberService.findOne(id);
    if (!TeamMember) throw new ApiError(ApiErrorCode.EntityNotFound);
    return TeamMemberDto.fromEntity(TeamMember);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get team members',
    operationId: 'getTeamMembers',
    tags: ['team-member'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: [TeamMemberDto] })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getTeamMembers() {
    const TeamMembers = await this.teamMemberService.findAll();
    return TeamMembers.map(TeamMemberDto.fromEntity);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
