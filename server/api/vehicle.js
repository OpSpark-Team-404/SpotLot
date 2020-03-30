const {
  addVehicle,
  selectVehicle,
  deleteVehicle,
  deleteAllUserVehicles,
  patchVehicle
} = require("../db/index");

//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a vehicle function");
    res.send("vehicle functions Return");
  });

  fastify.post("/addVehicle/:user_id", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { user_id } = req.params;
    addVehicle(user_id, req.body)
      .then((data) => {
        console.log(data);
        res.send('Added vehicle to DB');
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });

  fastify.get("/selectVehicle/:id", (req, res) => {
    selectVehicle(req.params.id)
      .then(data => {
        res.send(data.rows[0]);
      })
      .catch(error => {
        console.log(error);
        res.send('Unable to grab vehicle from DB');
      });
  });

  fastify.delete("/deleteVehicle/:id", (req, res) => {
    deleteVehicle(req.params.id)
      .then(() => {
        res.send('Successfully deleted Vehicle from DB');
      })
      .catch(error => {
        console.log(error);
        res.send("Failed to delete vehicle from DB");
      });
  });
  
  fastify.delete("/deleteAll/:user_id", (req, res) => {
    deleteAllUserVehicles(req.params.user_id)
      .then(() => {
        res.send("Successfully deleted all of current users vehicles from DB");
      })
      .catch(error => {
        console.log(error);
        res.send("Failed to delete all user vehicles from DB");
      });
  }); 

  fastify.patch("/patchVehicle/:id", (req, res) => {
    patchVehicle(req.params.id, req.body)
    .then( data => res.send(data))
    .catch( error => console.log(error))
  });
};
