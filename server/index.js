const fastify = require('fastify')({ logger: true })

//Routes
fastify
  .register(require('./serverAPI/testRoute'), { prefix: '/api' })  //test route

//start server
const start = async () => {
  try {
    await fastify.listen(8080)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()