const express = require("express");
const mongoose = require('mongoose');
const logger = require("morgan")

const app = express();

app.use(logger("dev"));

// Setting up PORTS
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Requiring Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);



// Connections

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}!`)
})