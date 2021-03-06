
//Mongoose
let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});



module.exports = function (app) {
    
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({}, (err, data) => {
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
        db.Workout.create({}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data)
            }
        })
    });

    
    // Update an exercise
    // Route to add an exercise
  
    app.put("/api/workouts/:id", function (req, res) {
        const id = req.params.id
        db.Workout.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, 
            { $push:  { exercises: req.body }},
            { new: true },
            (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data)
            }
        });
    });

    // to get workouts in range..
    // /api/workouts/range
    app.get("/api/workouts/range", function(req, res) {
        db.Workout.find({}).sort({day: 1}).limit(7).then( data  => {
            console.log(data)
            res.json(data)
            
        }).catch(err => {
            console.log(err)
        });
    });
}