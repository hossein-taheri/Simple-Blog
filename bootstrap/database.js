const mongoose = require('mongoose');

//Mongoose Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Connection to DB
mongoose
    .connect(
        process.env.DB_CONNECTION + "://" +
        process.env.DB_HOST + ":" +
        process.env.DB_PORT  + "/" +
        process.env.DB_DATABASE  , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch(err => console.error("Connection error", err));
