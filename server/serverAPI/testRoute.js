//exort should be a function that takes in fastify instance
module.exports = async function (fastify) {
  // All APIs are under route here
  fastify.get('/', (req, res) => {
    console.log('MADE REQUEST')
    res.send('Hit')
  });
}