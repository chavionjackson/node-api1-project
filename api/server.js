// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());

// [GET] /api/users (R of CRUD, fetch all users)
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

// [GET] /api/users/:id (R of CRUD, fetch user by :id)
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user information could not be retrieved",
        err: err.message,
      });
    });
});

// [POST] /api/users (C of CRUD, create new user from JSON payload)
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  } else
    Users.insert(newUser)
      .then((addUser) => {
        res.status(201).json(addUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          err: err.message,
        });
      });
});

// [DELETE] /api/users/:id (D of CRUD, remove user with :id)
server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await Users.remove(req.params.id);
    if (!deletedUser) {
      res.status(404).json({
        message: "The user with the specified ID does not exist",
      });
    } else {
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user could not be removed",
    });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
