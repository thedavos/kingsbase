import { setupContainer } from 'server/config/container';

export default defineNitroPlugin(async () => {
  setupContainer();
});
