import 'reflect-metadata';
import { container } from 'tsyringe';
import { useValidatedBody } from 'h3-zod';
import type { H3Error } from 'h3';
import { LeaguesService } from 'server/leagues/leagues.service';
import { createLeagueZodSchema } from 'server/leagues/dtos/create-league.dto';
import { handleApiError } from 'server/utils/errors';
import { createResponseApi } from 'server/utils/createResponseApi';
import type { League } from 'server/database/schemas/leagues.schema';

export default eventHandler(async (event) => {
  const leagueService = container.resolve(LeaguesService);

  try {
    const body = await useValidatedBody(event, createLeagueZodSchema);
    const createdLeagueDto = createLeagueZodSchema.parse(body);
    const createdLeague = await leagueService.createLeague(createdLeagueDto);

    return createResponseApi<League>(event, createdLeague, {
      statusCode: 201,
      statusText: 'League created successfully.',
    });
  }
  catch (error) {
    return handleApiError(error as H3Error);
  }
});
