//exort should be a function that takes in fastify instance
module.exports = async function(fastify) {

  // All APIs are under route here
  fastify.get("/", (req, res) => {
    console.log("Run a vehicle function");
    res.send("vehicle functions Return");
  });

  fastify.post("/addVehicle", (req, res) => {
    console.log("Run addVehicle function");  
    res.send("addVehicle Return");
  });

  fastify.get("/selectVehicle", (req, res) => {
    console.log("Run selectVehicle function");
    res.send("selectVehicle Return");
  });

  fastify.delete("/deleteVehicle", (req, res) => {
    console.log("Run deleteVehicle function");
    res.send("deleteVehicle Return");
  });
  
  fastify.delete("/deleteAll", (req, res) => {
    console.log("Run deleteAllUserVehicles function");
    res.send("deleteAllUserVehicles Return");
  }); 

  fastify.patch("/patchVehicle", (req, res) => {
    console.log("Run patchVehicle function");
    res.send("patchVehicle Return");
  });
};
