const { addUser, deleteUser, allUsers, selectUser, patchUser } = require('../db/index');

//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a user function");
    res.send("return user data");
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
        res.send(data);
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
        res.send(data);
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to grab user from DB");
      });
  });

  // patchUser in DB
  fastify.patch("/patchUser/:id", (req, res) => {
    console.log(req);
    patchUser(req.params.id, req.body)
      .then(data => {
        console.log(data);
        res.send("Patching user from DB");
      })
      .catch(error => {
        console.log(error);
        res.send("Unable to patch user from DB");
      });
  });
};
