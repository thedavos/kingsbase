import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { LeaguesRepository } from 'server/leagues/leagues.repository';
import type { CreateLeagueDto } from 'server/leagues/dtos/create-league.dto';
import type { League } from 'server/database/schemas/leagues.schema';

@injectable()
export class LeaguesService {
  constructor(
    @inject(LeaguesRepository) private leaguesRepository: LeaguesRepository,
  ) {}

  createLeague(data: CreateLeagueDto): Promise<League> {
    return this.leaguesRepository.create(data);
  }

  getLeagues(): Promise<League[]> {
    return this.leaguesRepository.findAll();
  }
}
