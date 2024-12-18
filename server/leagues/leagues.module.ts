import { LeaguesRepository } from './leagues.repository';
import { LeaguesService } from './leagues.service';

export default {
  services: [{
    token: 'LeaguesService',
    provide: LeaguesService,
  }],
  repositories: [{
    token: 'LeaguesRepository',
    provide: LeaguesRepository,
  }],
};
