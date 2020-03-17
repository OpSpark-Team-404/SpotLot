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

const addUser = (image_url, bio, name, billing_info) => {
    const query = 'INSERT INTO "user" (image_url, bio, name, billing_info) VALUES ($1, $2, $3, $4)'
    pool.query(query, [image_url, bio, name, billing_info]
    )
    .then(() => console.log("User added"))
    .catch(err => console.log(err))
}

addUser("test", "test", "test", "test");