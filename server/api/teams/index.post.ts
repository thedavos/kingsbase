import 'reflect-metadata';
import { container } from 'tsyringe';
import { useValidatedBody } from 'h3-zod';
import type { H3Error } from 'h3';
import { TeamsService } from 'server/teams/teams.service';
import { createTeamZodSchema } from 'server/teams/dtos/create-team.dto';
import { handleApiError } from 'server/utils/errors';
import { createResponseApi } from 'server/utils/createResponseApi';
import type { Team } from 'server/database/schemas/teams.schema';

export default eventHandler(async (event) => {
  const teamService = container.resolve(TeamsService);

  try {
    const body = await useValidatedBody(event, createTeamZodSchema);
    const createdTeamDto = createTeamZodSchema.parse(body);
    const createdTeam = await teamService.createTeam(createdTeamDto);

    return createResponseApi<Team>(event, createdTeam, {
      statusCode: 201,
      statusText: 'Team created successfully.',
    });
  }
  catch (error) {
    return handleApiError(error as H3Error);
  }
});
