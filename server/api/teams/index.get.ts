import 'reflect-metadata';
import { container } from 'tsyringe';
import { TeamsService } from 'server/teams/teams.service';

export default eventHandler(async () => {
  const teamService = container.resolve(TeamsService);

  return await teamService.getTeams();
});
