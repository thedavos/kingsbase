import 'reflect-metadata';
import { container } from 'tsyringe';
import { z } from 'zod';
import { useValidatedBody, useValidatedParams } from 'h3-zod';
import type { H3Error } from 'h3';
import { LeaguesService } from 'server/leagues/leagues.service';
import { updateLeagueZodSchema } from 'server/leagues/dtos/update-league.dto';
import { handleApiError } from 'server/utils/errors';
import { createResponseApi } from 'server/utils/createResponseApi';
import type { League } from 'server/database/schemas/leagues.schema';

export default eventHandler(async (event) => {
  const leagueService = container.resolve(LeaguesService);

  try {
    const { uuid } = await useValidatedParams(event, {
      uuid: z.string().uuid(),
    });

    const leagueToUpdate = await useValidatedBody(event, updateLeagueZodSchema);
    const leagueUpdated = await leagueService.updateLeagueByUuid(uuid, leagueToUpdate);

    return createResponseApi<League>(event, leagueUpdated, {
      statusCode: 200,
      statusText: 'Updated successfully.',
    });
  }
  catch (error) {
    return handleApiError(error as H3Error);
  }
});
