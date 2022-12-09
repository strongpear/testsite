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
      expires: 60 * 60 * 24,
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

//   const username = req.body.username
//   const email = req.body.email
//   const password = req.body.password
//   pool.query("SELECT * FROM info WHERE username = $1", [username],
//   (err, result) => {
//     if (result.rows.length >= 1) {
//       console.log(`Duplicate Username`)
//     }
//     else {
//       pool.query("INSERT INTO info (username, email, password) VALUES ($1, $2, $3)",
//       [username, email, password],
//       (err, result) => {
//         console.log(`error is ${err}`)
//         console.log(`result is ${result}`)
//       });
//     }
//   });
// })

// WIth password Hashing

app.post('/register', (req, res) => {

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  // var valid = true;
  // const regex_email = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
  // const regex_password_username = new RegExp('.{6,}');
  // console.log(`Before the check valid is ${valid}`)
  // console.log(regex_email.test(email))
  // if(!regex_email.test(email)){
  //   valid = false;
  //   console.log(`Email not inpuuted correctly`)
  // }
  // if(!regex_password_username.test(username)){
  //   valid = false;
  //   console.log(`Username must contain 6 or more characters`)
  // }
  // if(!regex_password_username.test(password)){
  //   valid = false;
  //   console.log(`Password must contain 6 or more characters`)
  // }
  // console.log(`After the check valid is ${valid}`)
  // if(valid){
    pool.query("SELECT * FROM info WHERE username = $1", [username],
      (err, result) => {
        if (result.rows.length >= 1) {
          console.log(`Duplicate Username`)
        }
        else {
          bcrypt.genSalt(saltRounds, (err, salt) => {
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
        }
      })
  //  }
  })

  app.post('/send', (req, res) => {
    const sender = req.session.user
    const receiver = req.body.receiver
    const amount = req.body.amount
    console.log(`Sending a payment`)
    console.log(`Sender is  ${sender}`)
    console.log(`Reciver is ${receiver}`)
    console.log(`Amount is ${amount}`)
    pool.query("SELECT * FROM info WHERE username = $1", [receiver],
    (err, result) => {
      if (result.rows.length == 0) {
        console.log(`Reciver ${receiver} Username Does not exist`)
      }
      else{
        pool.query("SELECT * FROM info WHERE username = $1", [sender],
        (err, senderresult) => {
          console.log(`Getting the sender from the Database`)
          console.log(senderresult);
          console.log(senderresult.rows[0]);
          console.log(senderresult.rows[0].balance);
          if(senderresult.rows[0].balance < amount){
             console.log(senderresult.rows[0].balance)
             console.log(amount)
             console.log(`Sender ${sender} Does not have enough money`)
          }
          else{
            console.log("updating receiver amount")
            // Increase receiver amount
            pool.query("UPDATE info SET balance = balance + $1 WHERE username = $2",
            [amount, receiver],
            (err, result) => {
              console.log(`error is ${err}`)
              console.log(`result is ${result}`)
            })
            console.log("logged in user is " + sender)
            console.log("updating sender amount")

            // Decrease sender amount
            pool.query("UPDATE info SET balance = balance - $1 WHERE username = $2",
            [amount, sender],
            (err, result) => {
              console.log(`error is ${err}`)
              console.log(`result is ${result}`)
            })
          }
        })
      }
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


//  app.post('/login', (req, res) => {
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
comparison = false;
app.post('/login', (req, res) => {
  const username = req.body.username;
  const plaintextPassword = req.body.password;

  pool.query(
      
      "SELECT * FROM info WHERE username = $1",
      [username],
      (err, result) => {

        original_result = result;
        // console.log(`result is ${result}`)
        // console.log(`result.rows is ${result.rows}`)
        // console.log(`result.rows[0] is ${result.rows[0]}`)
        // console.log(`result.rows[0].password is ${result.rows[0].password}`)
        bcrypt.compare(plaintextPassword, result.rows[0].password, function(err, result) {
          console.log(`error is ${err}`)
          console.log(`result is ${result}`)
          if (err) {
              res.send({err: err}); //if error, next wont run
          }
          comparison = result;
        });
          // If we have found someone with that username/pass combo
          console.log(`comparison is ${comparison}`)
          if (comparison) {
              req.session.user = username;
              //console.log("The login page:")
              //console.log(req.session.user);
              //console.log(result)
              console.log("success")
              res.send(original_result)
          }
          else {
              console.log("failed")
              res.send({message: "Invalid Credentials."})
          }

    }
  )
})

app.post('/logout', (req, res) => {
  console.log("The logout page:")
  console.log(req.session.user);
  //delete req.session.user;
  //req.session.user = '';
  if(req.session){

    req.session.destroy((error)=>{
       if(error){
         console.log(error);
       }
    });
  }
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
    res.send(`Welcome ${req.session.user}. Your balance is`);
  }
  else{
    res.send("Welcome to our app. No user signed in.");
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
