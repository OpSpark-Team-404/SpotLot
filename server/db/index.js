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


//USER
const addUser = (name, email, google_token, image_url, bio, billing_info) => {
    const query = 'INSERT INTO "user" (name, email, google_token, image_url, bio, billing_info) VALUES ($1, $2, $3, $4, $5, $6)'
    pool.query(query, [name, email, google_token, image_url, bio, billing_info]
    )
    .then(() => console.log("User added"))
    .catch(err => console.log(err))
}

// addUser("test", "test@test.com", "test123", "test", "test", "test");

const deleteUser = (id) => {

}

const selectUser = (email) => {
    const query = 'SELECT * FROM "user" WHERE email = $1'
    pool.query(query, [email])
    .then( res => console.log(res.rows[0]))
    .catch( err => console.log(err))
}

// selectUser("test@test.com");

//VEHICLE

const addVehicle = (user_id, make, model, color, plate, state) => {
    const query = "INSERT INTO vehicle (user_id, make, model,license_plate, color, state) VALUES ($1, $2, $3, $4, $5, $6)"
    pool.query(query, [user_id, make, model, color, plate, state])
    .then(console.log("Vehicle added!"))
    .catch( err => console.log(err))
}

// addVehicle(3, "Chevy", "Malibu", "12345678", "Silver", "LA" )

const selectVehicle = (id) => {
    const query = "SELECT * FROM vehicle WHERE id = $1"
    pool.query(query, [id])
    .then(res => console.log(res.row[0]))
    .catch( err => console.log(err))
}

const deleteVehicle = () => {

}

const patchVehicle = () => {

}

//SPOT

const addSpot = () => {

}

const selectSpot = () => {

}

const deleteSpot = () => {

}

const patchSpot = () => {

}

//LOT

const addLot = () => {

}

const selectLot = (id) => {

}

const deleteLot = (id) => {

}

const patchLot = (id) => {

}

//REVIEW

const addReview = (id) => {

}

const selectReview = (id) => {

}