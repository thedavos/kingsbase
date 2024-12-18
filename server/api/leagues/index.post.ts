import 'reflect-metadata';
import { container } from 'tsyringe';
import { useValidatedBody } from 'h3-zod';
import { LeaguesService } from 'server/leagues/leagues.service';
import { createLeagueZod } from 'server/leagues/dtos/create-league.dto';

export default eventHandler(async (event) => {
  const leagueService = container.resolve(LeaguesService);
  const body = await useValidatedBody(event, createLeagueZod);
  const createLeagueDto = createLeagueZod.parse(body);

  return leagueService.createLeague(createLeagueDto);
});
