const { Client, Pool } = require('pg');
var fs = require('fs');

// for reading schema file but can't figure out how to parse correctly
// var sql = fs.readFileSync('spotlot.sql').toString();

// Creates new pool
const pool = new Pool({
    user: "postgres",
    password: "bacool7769",
    host: "localhost",
    database: "spotlot"
})

// Connects pool to DB
pool.connect()
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))

//
//USER
//

const addUser = (name, email, google_token, image_url, bio, billing_info) => {
    const query = 'INSERT INTO "user" (name, email, google_token, image_url, bio, billing_info) VALUES ($1, $2, $3, $4, $5, $6)'
    pool.query(query, [name, email, google_token, image_url, bio, billing_info]
    )
    .then(() => console.log("User added"))
    .catch(err => console.log(err))
}

// addUser("test", "test@test.com", "test123", "test", "test", "test");

const deleteUser = (id) => {
    const query = 'DELETE FROM "user" WHERE id = $1'
    pool.query(query, [id])
    .then(()=> console.log("User deleted"))
    .catch(err => console.log(err))
}

// deleteUser(1)

const selectUser = (email) => {
    const query = 'SELECT * FROM "user" WHERE email = $1'
    pool.query(query, [email])
    .then( res => console.log(res.rows[0]))
    .catch( err => console.log(err))
}

// selectUser("test@test.com");

const patchUser = (id) => {

}

//
//VEHICLE
//

const addVehicle = (user_id, make, model, color, plate, state) => {
    const query = "INSERT INTO vehicle (user_id, make, model,license_plate, color, state) VALUES ($1, $2, $3, $4, $5, $6)"
    pool.query(query, [user_id, make, model, color, plate, state])
    .then(console.log("Vehicle added!"))
    .catch( err => console.log(err))
}

// addVehicle(3, "Ford", "Focus", "12345678", "Silver", "LA" )

const selectVehicle = (id) => {
    const query = "SELECT * FROM vehicle WHERE id = $1"
    pool.query(query, [id])
    .then(res => console.log(res.rows[0]))
    .catch( err => console.log(err))
}

// selectVehicle(2)

const deleteVehicle = (id) => {
    const query = 'DELETE FROM vehicle WHERE id = $1'
    pool.query(query, [id])
    .then(()=> console.log("Vehicle deleted"))
    .catch(err => console.log(err))
}

// deleteVehicle(1)

const deleteAllUserVehicles = (user_id) => {
    const query = 'DELETE FROM vehicle WHERE user_id = $1'
    pool.query(query, [user_id])
    .then(()=> console.log("All user vehicles deleted"))
    .catch(err => console.log(err))
}

// deleteAllUserVehicles(3)

const patchVehicle = (id, patchArr) => {

}

//
//LOT
//

const addLot = (owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description) => {
    const query = "INSERT INTO lot (owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)"
    pool.query(query, [owner_id, image_url, price, longitude, latitude, is_open, lot_close, max_reserve, max_spots, current_spots, description])
    .then(console.log("Lot added!"))
    .catch( err => console.log(err))
}

addLot(3, "test_url", 20, 0, 0, true, new Date, new Date, 4, 0, "A test lot")

const selectLot = (id) => {
    
}

const deleteLot = (id) => {
    
}

const patchLot = (id) => {
    
}

//
//SPOT
//

const addSpot = (lot_id, user_id) => {

}

const selectSpot = (id) => {

}

const deleteSpot = (id) => {

}

const patchSpot = () => {

}

const reserveSpot = (lot_id) => {

}

//
//REVIEW
//

const addReview = (id) => {
    
}

const selectReview = (id) => {

}

const patchReview = (id) => {

}

module.exports = {
//USER
addUser,
selectUser,
deleteUser,
patchUser,
//VEHICLE
addVehicle,
selectVehicle,
deleteVehicle,
deleteAllUserVehicles,
patchVehicle,
//SPOT
addSpot,
selectSpot,
deleteSpot,
patchSpot,
reserveSpot,
//LOT
addLot,
selectLot,
deleteLot,
patchLot,
//REVIEW
addReview,
selectReview,
patchReview
}