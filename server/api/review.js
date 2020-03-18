//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a review function");
    res.send("review functions Return");
  });

  fastify.post("/addReview", (req, res) => {
    console.log("Run addReview function");
    res.send("addReview functions Return");
  });

  fastify.get("/selectReview", (req, res) => {
    console.log("Run selectReview function");
    res.send("selectReview functions Return");
  });

  fastify.patch("/patchReview", (req, res) => {
    console.log("Run patchReview function");
    res.send("patchReview functions Return");
  });
};
