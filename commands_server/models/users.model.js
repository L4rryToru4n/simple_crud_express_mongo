const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the user's fullname"]
        },
        email: {
            type: String,
            required: [true, "Please enter the user's email address"]
        },
        password: {
            type: String,
            required: [true, "Please enter the user's secret password"]
        },
    },
    {timestamps: true}
);

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;