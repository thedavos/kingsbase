import 'reflect-metadata';
import { container } from 'tsyringe';
import { useValidatedQuery } from 'h3-zod';
import { z } from 'zod';
import { LeaguesService } from 'server/leagues/leagues.service';
import { TeamsService } from 'server/teams/teams.service';
import type { League } from 'server/database/schemas/leagues.schema';

export default eventHandler(async (event) => {
  const teamService = container.resolve(TeamsService);
  const leagueService = container.resolve(LeaguesService);
  const query = await useValidatedQuery(event, z.object({
    luuid: z.string().uuid().optional(),
  }));

  if (query?.luuid) {
    const league = await leagueService.getLeague({ uuid: query.luuid }) as League;

    return await teamService.getTeamsByQuery({
      leagueId: league.id,
    });
  }

  return await teamService.getTeams();
});
