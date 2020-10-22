const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now() 
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: true 
        },
        name: {
            type: String,
            trim: true,
            required: true
        },
        duration: {
            type: Number,
            required: true
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

    // This activates virtuals //

 }, { toJSON: { virtuals: true } 

});

// will take totalDuration of all workouts //
// and reduce them to one number then adds.//
// at the bottom it is defaulting to 0 //
WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration
    }, 0);
})


const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;

