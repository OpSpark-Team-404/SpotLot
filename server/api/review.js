const { addReview, selectReview, patchReview } = require("../db/index");

//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a review function");
    res.send("review functions Return");
  });

  fastify.post("/addReview/:user_id/:lot_id", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { rating, desc } = req.body;
    addReview(user_id, lot_id, rating, desc)
      .then(() => {
        res.send("Added review from user on lot to DB");
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to add review");
      });
  });

  fastify.get("/selectReview/:lot_id", (req, res) => {
    console.log(req.params);
    selectReview(req.params.lot_id)
      .then(data => {
        res.send(data.rows[0]);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to grab review from DB");
      });
  });

  fastify.patch("/patchReview", (req, res) => {
    console.log("Run patchReview function");
    res.send("patchReview functions Return");
  });
};
