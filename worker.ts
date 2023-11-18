declare const self: Worker;

self.addEventListener('message', async () => {
  const { foo } = await import('./lib');
  self.postMessage(await foo());
}, { once: true });
