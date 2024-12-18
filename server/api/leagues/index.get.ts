import 'reflect-metadata';
import { container } from 'tsyringe';
import { LeaguesService } from 'server/leagues/leagues.service';

export default eventHandler(async () => {
  const leagueService = container.resolve(LeaguesService);

  return await leagueService.getLeagues();
});
