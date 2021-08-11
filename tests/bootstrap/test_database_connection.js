const mongoose = require('mongoose');

//Mongoose Config
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Connection to DB
module.exports = {
    connect: () => {
        return new Promise(async (resolve, reject) => {
            await require('dotenv').config()
            mongoose
                .connect(
                    process.env.DB_CONNECTION + "://" +
                    process.env.DB_HOST + ":" +
                    process.env.DB_PORT + "/" +
                    process.env.TEST_DB_DATABASE , {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    })
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject();
                });
        })
    },
    disconnect: () => {
        return new Promise((resolve, reject) => {
            mongoose
                .disconnect()
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject();
                });
        })
    },
}