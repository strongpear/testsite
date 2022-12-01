// Initialize express server
const express = require("express");
const Pool = (require("pg")).Pool
const cors = require("cors");
require('dotenv').config()
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const session = require("express-session")

const bcrypt = require("bcrypt");
const saltRounds = 10;


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
//app.use(cors());
app.use(
    cors({
      //origin: ["http://localhost:3000"],
      //methods: ["GET", "POST"],
      credentials: true,
    })
  );
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 4,
    },
  })
);

// app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
    //serve static content
    // use npm run build
    app.use(express.static(path.join(__dirname, "client/build")))
}

// Prints when running server
app.listen(process.env.PORT | PORT, () => {
  console.log(`running server on port ${PORT}`)
})
/*const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'login',
    password: 'root',
    port: 5432,
}); */

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL //heroku addons
const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,

    // comment out when in localhost
    ssl: {
        rejectUnauthorized: false
      }

})
// Function to register the user
// app.post('/register', (req, res) => {

//     const username = req.body.username
//     const email = req.body.email
//     const password = req.body.password
//     pool.query("INSERT INTO info (username, email, password) VALUES ($1, $2, $3)",
//     [username, email, password],
//     (err, result) => {
//         console.log(`error is ${err}`)
//         console.log(`result is ${result}`)
//         console.log("The register page:")
//         console.log(req.session.user);
//       }
//     );
// })

// WIth password Hashing

app.post('/register', (req, res) => {

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  bcrypt.genSalt(10, (err, salt) => {
    console.log(`salt is ${salt}`)
    bcrypt.hash(password, salt, function(err, hash) {
    //bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      pool.query("INSERT INTO info (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hash],
      (err, result) => {
        console.log(`register page`);
        console.log(`salt now is ${salt}`);
        console.log(`hash now is ${hash}`)
        console.log(`error is ${err}`)
        console.log(`result is ${result}`)
      }
      );
    });
  })
})



// app.get('/login', (req, res) => {
//     if (req.session.user) {
//       res.send({ loggedIn: true, user: req.session.user });
//     } else {
//       res.send({ loggedIn: false });
//     }
//   }); 

// Function to authenticate user
// app.post('/login', (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
    
//     pool.query(
        
//         "SELECT * FROM info WHERE username = $1 AND password = $2",
//         [username, password],
//         (err, result) => {
//             console.log(`error is ${err}`)
//             console.log(`result is ${result}`)
//             if (err) {
//                 res.send({err: err}); //if error, next wont run
//             }
//             // If we have found someone with that username/pass combo
//             if (result.rows.length > 0) {
//                 req.session.user = username;
//                 console.log("The login page:")
//                 console.log(req.session.user);
//                 //console.log(result)
//                 console.log("success")
//                 res.send(result)
//             }
//             else {
//                 console.log("failed")
//                 res.send({message: "Invalid Credentials."})
//             }
//         }
//     )
//  })

// With password hashing

// app.post('/login', (req, res) => {
//   const username = req.body.username;
//   const passwords = req.body.password;
//   bcrypt.genSalt(10, (err, salt) => {
//     console.log(`salt is ${salt}`)
//     bcrypt.hash(passwords, salt, function(err, hash) {
//     //bcrypt.hash(passwords, saltRounds, (err, hash) => {
//       if (err) {
//         console.log(err);
//       }
//       pool.query(
          
//           "SELECT * FROM info WHERE username = $1 AND password = $2",
//           [username, hash],
//           (err, result) => {
//               console.log(`login page`)
//               console.log(`salt is ${salt}`)
//               console.log(`error is ${err}`)
//               console.log(`result is ${result}`)
//               console.log(`hash is ${hash}`)
//               if (err) {
//                   res.send({err: err}); //if error, next wont run
//               }
//               // If we have found someone with that username/pass combo
//               if (result.rows.length > 0) {
//                   req.session.user = result;
//                   console.log(req.session.user);
//                   //console.log(result)
//                   console.log("success")
//                   res.send(result)
//               }
//               else {
//                   console.log("failed")
//                   res.send({message: "Invalid Credentials."})
//               }
//           }
//       )
//     });
//   })
// })
app.post('/login', (req, res) => {
  const username = req.body.username;
  const plaintextPassword = req.body.password;

  pool.query(
      
      "SELECT * FROM info WHERE username = $1",
      [username],
      (err, result) => {
        console.log(`result is ${result}`)
        console.log(`result[] is ${result[]}`)
        console.log(`result[0].password is ${result[0].password}`)
        bcrypt.compare(plaintextPassword, result[0].password, function(err, result) {
          console.log(`error is ${err}`)
          console.log(`result is ${result}`)
          if (err) {
              res.send({err: err}); //if error, next wont run
          }
          // If we have found someone with that username/pass combo
          if (result) {
              req.session.user = username;
              console.log("The login page:")
              console.log(req.session.user);
              //console.log(result)
              console.log("success")
              res.send(result)
          }
          else {
              console.log("failed")
              res.send({message: "Invalid Credentials."})
          }
      });
    }
  )
})
app.post('/logout', (req, res) => {
  console.log("The logout page:")
  console.log(req.session.user);
  delete req.session.user;
  console.log(req.session.user);
})

// Get kycform data
app.post('/admin', (req, res) => {
  //console.log("on admin side")
  //console.log(pool.query("SELECT * FROM kycform"))
  console.log("The admin page:")
  console.log(req.session.user);
  pool.query("SELECT * FROM kycform",
  (err, result) => {
      if (err) {
          res.send({err: err})
      }
      else{
          res.send(result)
      }
    }
  );
})
app.post('/home', (req, res) => {
  console.log("The home page:")
  console.log(req.session.user);
  if(req.session.user){
    res.send(`Welcome ${req.session.user}`);
  }
  else{
    res.send("Welcome to Jaspal's app. No user signed in.");
  }
})
/*
app.get('/admin', (req, res) => {
  console.log("on admin side")
  pool.query("SELECT * FROM kycform",
  (err, result) => {
        console.log(result)
        res.send(result)
      }
  );
})
*/
app.post('/kycform', (req, res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const driverid = req.body.driverid
    const state = req.body.state
    const zip = req.body.zip 
    const birthdate = req.body.birthdate
    pool.query("INSERT INTO kycform (firstname, lastname, driverid, state, zip, birthdate) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstname, lastname, driverid, state, zip, birthdate],
    (err, result) => {
        console.log(`error is ${err}`)
        console.log(`result is ${result}`)
        console.log("The kycform page:")
        console.log(req.session.user);
      }
    );
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})
