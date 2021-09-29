// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get("/api/users", (req, res) => {
  Users.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The users information could not be retrieved",
        err: err.message,
      });
    });
});

// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// server.post("/api/users", (req, res) => {
//     const newUser = req.body
//     if(!newUser.name || !newUser.bio) {
//         res.status(400).json({
//           message: "Please provide name and bio for the user",
//         });
//     } else Users.insert(newUser)
//         .then(addUser => {
//             res.status(201).json(addUser)
//         })
// })

module.exports = server; // EXPORT YOUR SERVER instead of {}
