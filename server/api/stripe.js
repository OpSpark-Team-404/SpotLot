const stripe = require('stripe')('sk_test_...');

module.exports = async function(fastify) {

    // All APIs are under route here
    fastify.get("/create", (req, res) => {
      console.log("Run a stripe function");
      res.send("return createStripeUser data");
    });

  };