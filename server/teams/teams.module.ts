import { TeamsRepository } from './teams.repository';
import { TeamsService } from './teams.service';

export default {
  services: [{
    token: 'TeamsService',
    provide: TeamsService,
  }],
  repositories: [{
    token: 'TeamsRepository',
    provide: TeamsRepository,
  }],
};
