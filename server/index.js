const fastify = require('fastify')({ logger: true })
const { pool } = require('./db/index.js');

//Routes
fastify
.register(require('./serverAPI/testRoute'), { prefix: '/api' })  //test route

// Connects pool to DB
pool.connect()
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))

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
