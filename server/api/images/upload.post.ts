import { z } from 'zod';

export default eventHandler(async (event) => {
  const { prefix } = await getValidatedQuery(event, z.object({
    prefix: z.string().default(''),
  }).parse);

  return hubBlob().handleUpload(event, {
    multiple: false,
    put: {
      addRandomSuffix: true,
      prefix,
    },
    ensure: {
      maxSize: '8MB',
      types: ['image/png', 'image/jpeg', 'image/webp'],
    },
  });
});
