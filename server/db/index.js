const { Client, Pool } = require('pg');
var fs = require('fs');

var sql = fs.readFileSync('spotlot.sql').toString();

const pool = new Pool({
    user: "postgres",
    password: "bacool7769",
    host: "localhost",
    database: "spotlot"
})


pool.connect()
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))
// .finally(() => client.end());


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
    .then( res => console.log(res.fields))
    .catch( err => console.log(err))
}

selectUser("test@test.com");


