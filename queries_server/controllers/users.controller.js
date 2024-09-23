// https://www.contextneutral.com/implementing-cqrs-pattern-guide-scalable/
// https://www.freecodecamp.org/news/optimize-search-queries-in-mongodb/

const Users = require('../models/users.model');

async function getUsers(req, res) {
    try {
        const users = await Users.find({}).limit(10);

        return res.status(200).json(users);
    }
    catch (error) {
        const data = {
            status: false,
            message: "Failed to get users"
        }
        return res.status(500).json(data);
    }
}

async function getUser(req, res) {
    try {
        const id = req.params.user_id;

        const users = await Users.findOne({_id: id});

        return res.status(200).json(users);
    }
    catch (error) {
        const data = {
            status: false,
            message: "Failed to get the user"
        }
        return res.status(500).json(data);
    }
}

async function findUser(req, res) {
    try {
        let key = req.query.name;

        const keyCapital = key.charAt(0).toUpperCase() + key.slice(1);
        const keyLower = key.toLowerCase();

        const users = await Users.find({
            "$or": [
                { "name": {$regex: keyCapital}},
                { "name": {$regex: keyLower}}
            ]
        }).limit(10);

        return res.status(200).json(users);
    }
    catch (error) {
        const data = {
            status: false,
            message: "Failed to get users"
        }
        return res.status(500).json(data);
    }
}

module.exports = {
    findUser,
    getUsers,
    getUser,
}