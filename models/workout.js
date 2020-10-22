const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    day: Date,
    exercises: [{
        type: {
            type: String,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        duration: {
            type: Number
        },
        distance: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }
    }
]
 }, { toJSON: { virtuals: true } 
});


WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration
    }, 0);
})


const workout = mongoose.model("workout", WorkoutSchema);

module.exports = workout;

