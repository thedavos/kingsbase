import { container } from 'tsyringe';

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type AppModule = {
  repositories: any[];
  services: any[];
};

export const registerModule = (appModule: AppModule) => {
  appModule.services?.forEach(service => container.registerSingleton(service.provide));
  appModule.repositories?.forEach(repository => container.registerSingleton(repository.provide));
};
