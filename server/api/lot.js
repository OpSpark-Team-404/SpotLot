//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a lot function");
    res.send("return lot data");
  });

  fastify.post("/addLot", (req, res) => {
    console.log("Run a addLot function");
    res.send("return addLot data");
  });

  fastify.get("/selectLot", (req, res) => {
    console.log("Run a selectLot function");
    res.send("return selectLot data");
  });

  fastify.delete("/deleteLot", (req, res) => {
    console.log("Run a deleteLot function");
    res.send("return deleteLot data");
  });  

  fastify.patch("/patchLot", (req, res) => {
    console.log("Run a patchLot function");
    res.send("return patchLot data");
  });
};
