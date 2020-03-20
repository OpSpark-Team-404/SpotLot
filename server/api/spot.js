const {  addSpot,
  selectSpot,
  deleteSpot,
  patchSpot,
  reserveSpot
} = require('../db/index');

//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {
  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a Spot function");
    res.send("return Spot data");
  });

  fastify.post("/addSpot/:lot_id/:user_id", (req, res) => {
    console.log(req.params);
    const { lot_id, user_id } = req.params;
    addSpot(lot_id, user_id)
      .then((data) => {
        console.log(data);
        res.send('Spot added to lot in DB');
      })
      .catch((error) => {
        console.log(error);
        res.send('Unable to add spot to lot in DB')
      });
  });

  fastify.get("/selectSpot/:id", (req, res) => {
    console.log(req.params);
    selectSpot(req.params.id)
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.send('Unable to get spot from DB');
    });
  });

  fastify.delete("/deleteSpot/:id", (req, res) => {
    console.log(req.params);
    deleteSpot(req.params.id)
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to delete spot from DB");
      });
  });

  fastify.post("/reserveSpot/:id", (req, res) => {
    console.log(req.params);
    reserveSpot(req.params.id)
      .then(data => {
        console.log(data);
        res.send('spot reserved');
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to reserve spot in DB");
      });
  });

  fastify.patch("/patchSpot", (req, res) => {
    console.log("Run a patchSpot function");
    res.send("return patchSpot data");
  });

};
