export default eventHandler(async (event) => {
  return hubBlob().handleUpload(event, {
    multiple: false,
    put: {
      addRandomSuffix: true,
    },
    ensure: {
      maxSize: '8MB',
      types: ['image/png', 'image/jpeg'],
    },
  });
});
