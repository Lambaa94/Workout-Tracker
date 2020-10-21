const path = require("path")
// var db = require("../models");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});




module.exports = function (app) {
    // Route to get last workout
    // probably want to use index of after a sort

    //Find last date.. Total workout duration.. Total exercises performed..Total distance covered.. Total weight lifted.. Total Sets performed.. Total Reps Performed


    app.get("/api/workouts", function (req, res) {
        db.workouts.find({}, (err, data) => {
            if (err) {
                console.log(err);

            } else {
                res.json(data)
            }
        });
    });

    // Route to create workout
    // /api/workouts
    app.post("/api/workouts", function (req, res) {
        db.workouts.insert({
            day: new Date().setDate(new Date().getDate()), exercises: [{
                type: req.body.type, name: req.body.name, duration: req.body.duration,
                weight: req.body.weight, reps: req.body.reps, sets: req.body.sets, distance: req.body.distance
            }]
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data)
            }
        })
    });

    //Update an exercise


    // Route to add an exercise
    // /api/workouts/:id
    app.put("/api/workouts/:id", function (req, res) {
        const id = req.params.id
        db.workouts.replaceOne({ _id: mongojs.ObjectId(id) }, {
            day: new Date().setDate(new Date().getDate()), exercises: [{
                type: req.body.type, name: req.body.name, duration: req.body.duration,
                weight: req.body.weight, reps: req.body.reps, sets: req.body.sets, distance: req.body.distance
            }]
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data)
            }
        });
    });

    // to get workouts in range..?
    // /api/workouts/range
    app.get("/api/workouts/range", function (req, res) {
        db.workouts.find().sort({ day: 1 }).limit(7, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data)
            }
        });
    });


}