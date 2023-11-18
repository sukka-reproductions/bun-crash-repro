(async () => {
  const worker = new Worker(new URL('./worker', import.meta.url));

  const promise = new Promise<string[]>(resolve => {
    const handleMessage = (e: MessageEvent<string[]>) => {
      const { data } = e;
      resolve(data);
    };
    worker.addEventListener('message', handleMessage, { once: true });
    worker.postMessage('');
  });

  const t = await promise;
  console.log({ t });

  worker.terminate();
})();
