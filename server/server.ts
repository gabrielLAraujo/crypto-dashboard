import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/ping', async () => {
  return { pong: 'it works!' };
});

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});
