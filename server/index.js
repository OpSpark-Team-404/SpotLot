const fastify = require('fastify')({ logger: true })
const { pool } = require('./db/index.js');

//Routes
fastify
  .register(require("./api/testRoute"), { prefix: "/api" }) //test route
  .register(require("./api/user"), { prefix: "/user" })
  .register(require("./api/vehicle"), { prefix: "/vehicle" })
  .register(require("./api/lot") , { prefix: "/lot" })
  .register(require("./api/spot") , { prefix: "/spot" })
  .register(require("./api/review") , { prefix: "/review" })
  .register(require("./api/stripe") , { prefix: "/stripe" });

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
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
