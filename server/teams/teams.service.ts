import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { TeamsRepository } from 'server/teams/teams.repository';
import type { CreateTeamDto } from 'server/teams/dtos/create-team.dto';
import type { UpdateTeamDto } from 'server/teams/dtos/update-team.dto';
import type { Team } from 'server/database/schemas/teams.schema';
import { teams } from 'server/database/schemas/teams.schema';

@injectable()
export class TeamsService {
  constructor(
    // eslint-disable-next-line @stylistic/no-tabs
		@inject(TeamsRepository) private teamsRepository: TeamsRepository,
  ) {}

  createTeam(data: CreateTeamDto): Promise<Team> {
    return this.teamsRepository.create(data);
  }

  getTeams(): Promise<Team[]> {
    return this.teamsRepository.findAll();
  }

  updateTeamByUuid(uuid: string, data: UpdateTeamDto) {
    return this.teamsRepository.update(data, eq(teams.uuid, uuid));
  }

  updateTeamById(id: number, data: UpdateTeamDto) {
    return this.teamsRepository.update(data, eq(teams.id, id));
  }
}
