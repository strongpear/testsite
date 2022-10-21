// Initialize express server
const express = require("express");
const Pool = (require("pg")).Pool
const cors = require("cors");
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Prints when running server
app.listen(port, () => {
  console.log("running server")
})

const connectStr = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectStr,
    ssl: true,
  });


  /*
 const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'login',
    password: 'root',
    port: 5432,
}); */


// Function to register the user
app.post('/register', (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    pool.query("INSERT INTO info (username, email, password) VALUES ($1, $2, $3)",
    [username, email, password],
    (err, result) => {
        console.log(err);
      }
    );
})

// Function to authenticate user
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(
        "SELECT * FROM info WHERE username = $1 AND password = $2",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err}); //if error, next wont run
            }
            // If we have found someone with that username/pass combo
            if (result.rows.length > 0) {
                res.send(result)
            }
            else {
                res.send({message: "Invalid Credentials."})
            }
        }
    )
})


