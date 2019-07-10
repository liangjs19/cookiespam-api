// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
var routes = require("./routes/routes.js");

// Declare a route
fastify.get('/', async (request, reply) => {
    reply.send({ hello: 'world' })
})

routes.forEach((route, index) => {
    fastify.route(route)
})

fastify.use(require('cors')())
// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()