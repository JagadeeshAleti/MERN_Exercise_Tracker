const router = require("express").Router();
const Exercise = require("../models/exercise.model");
let User = require("../models/user.model");

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!!"))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/update/:id").patch((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      user.username = req.body.username;

      user
        .save()
        .then(() => {
          res.json("Exercise Update");
        })
        .catch((err) => res.status(400).json("Error : " + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
});
module.exports = router;
