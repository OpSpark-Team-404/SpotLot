const { addUser, deleteUser, allUsers, selectUser, userLots, patchUser, allSpots, patchUserLot, patchUserSpot } = require('../db/index');

//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/userLots/:id", (req, res) => {
    userLots(req.params.id)
    .then((data) => {
      res.send(data.rows);
    })
    .catch(error => {
      console.log(error);
    });
  });

  // addUser to DB
  fastify.post("/addUser", (req, res) => {
    addUser(req.body).then(data => {
      res.send('Added user to DB')
    })
    .catch(error => {
      console.log(error);
      res.send('Unable to add user to DB');
    });
  });

  // deleteUser from DB
  fastify.delete("/deleteUser/:id", (req, res) => {
    deleteUser(req.params.id)
      .then(() => {
        res.send('Deleted user from DB')
      })
      .catch(error => {
        console.log(error);
        res.send('Unable to delete user from DB');
      });
  });

  // allUsers from DB
  fastify.get("/allUsers", (req, res) => {
    allUsers()
      .then(data => {
        res.send(data.rows);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to grab users from DB");
      });
  });

  // selectUser from DB
  fastify.get("/selectUser/:email", (req, res) => {
    selectUser(req.params.email)
      .then(data => {
        res.send(data.rows[0]);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to grab user from DB");
      });
  });

  // patchUser in DB
  fastify.patch("/patchUser/:id", (req, res) => {
    patchUser(req.params.id, req.body)
      .then(data => res.send(data))
      .catch(error => console.log(error))
  });

  // patchUserLot in DB
  fastify.patch("/patchUserLot/:id", (req, res) => {
    patchUserLot(req.params.id, req.body)
      .then(data => res.send(data))
      .catch(error => console.log(error))
  });

  // patchUserSpot in DB
  fastify.patch("/patchUserSpot/:id", (req, res) => {
    patchUserSpot(req.params.id, req.body)
      .then(data => res.send(data))
      .catch(error => console.log(error))
  });

  fastify.get("/allSpots/:id", (req, res) => {
    allSpots(req.params.id)
      .then(data => {
        res.send(data.rows);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to grab spots from DB");
      });
  });
};