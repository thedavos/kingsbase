import 'reflect-metadata';
import { container } from 'tsyringe';
import { useValidatedBody } from 'h3-zod';
import type { H3Error } from 'h3';
import { LeaguesService } from 'server/leagues/leagues.service';
import { createLeagueZodSchema } from 'server/leagues/dtos/create-league.dto';
import { handleApiError } from 'server/utils/errors';

export default eventHandler(async (event) => {
  const leagueService = container.resolve(LeaguesService);

  try {
    const body = await useValidatedBody(event, createLeagueZodSchema);
    const leagueCreatedDto = createLeagueZodSchema.parse(body);

    return leagueService.createLeague(leagueCreatedDto);
  }
  catch (error) {
    return handleApiError(error as H3Error);
  }
});
