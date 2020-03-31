const { addLot, allLots, selectLot, deleteLot, patchLot } = require('../db/index');

//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/allLots", (req, res) => {
    allLots()
      .then(data => {
        res.send(data);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to grab lots from DB");
      });
  });

  fastify.post("/addLot", (req, res) => {
    addLot(req.body)
      .then(data => {
        res.send(data, 'Added lot to DB');
      })
      .catch(error => {
        console.log(error);
        res.send(error)
      })
  });

  fastify.get("/selectLot/:id", (req, res) => {
    selectLot(req.params.id)
      .then(data => {
        res.send(data.rows[0]);
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  });

  fastify.delete("/deleteLot/:id", (req, res) => {
    deleteLot(req.params.id)
      .then(data => {
        res.send('Successfully Deleted Lot');
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  });  

  fastify.patch("/patchLot/:id", (req, res) => {
    console.log(req);
    patchLot(req.params.id, req.body)
      .then(data => {
        console.log(data);
        res.send("Patching lot in DB");
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to patch lot in DB");
      });
  });
};
