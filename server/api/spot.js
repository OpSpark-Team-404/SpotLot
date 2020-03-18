//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {
  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a Spot function");
    res.send("return Spot data");
  });

  fastify.post("/addSpot", (req, res) => {
    console.log("Run a addSpot function");
    res.send("return addSpot data");
  });

  fastify.get("/selectSpot", (req, res) => {
    console.log("Run a selectSpot function");
    res.send("return selectSpot data");
  });

  fastify.delete("/deleteSpot", (req, res) => {
    console.log("Run a deleteSpot function");
    res.send("return deleteSpot data");
  });

  fastify.patch("/patchSpot", (req, res) => {
    console.log("Run a patchSpot function");
    res.send("return patchSpot data");
  });

  fastify.post("/reserveSpot", (req, res) => {
    console.log("Run a reserveSpot function");
    res.send("return reserveSpot data");
  });
};
