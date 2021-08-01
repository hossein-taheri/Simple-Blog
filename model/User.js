const mongoose = require("mongoose");
let mongooseHidden = require('mongoose-hidden')()


const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        hash: {
            type: String,
            required: true,
            hidden: true,
        },
        salt: {
            type: String,
            required: true,
            hidden: true,
        },
        email: {
            type: String,
            required: true,
            hidden: true,
        },
        register_at: {
            type: Date,
        }
    },
    {timestamps: true},
);
UserSchema.plugin(mongooseHidden)

const User = mongoose.model('User', UserSchema);

module.exports = User;