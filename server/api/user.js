//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a user function");
    res.send("return user data");
  });

  // addUser to DB
  fastify.post("/addUser", (req, res) => {
    console.log("Run addUser function");
    res.send("addUser return");
  });

  // deleteUser from DB
  fastify.delete("/deleteUser", (req, res) => {
    console.log("Run deleteUser function");
    res.send("deleteUser return");
  });

  // selectUser from DB
  fastify.get("/selectUser", (req, res) => {
    console.log("Run selectUser function");
    res.send("selectUser return");
  });

  // patchUser in DB
  fastify.patch("/patchUser", (req, res) => {
    console.log("Run patchUser function");
    res.send("return patchUser data");
  });
};
