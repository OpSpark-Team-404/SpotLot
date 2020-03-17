const { Client } = require('pg');
var fs = require('fs');

var sql = fs.readFileSync('spotlot.sql').toString();

const client = new Client({
    user: "postgres",
    password: "bacool7769",
    host: "localhost",
    database: "spotlot"
})


client.connect()
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err))
// .finally(() => client.end());

