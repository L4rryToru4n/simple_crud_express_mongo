// https://www.contextneutral.com/implementing-cqrs-pattern-guide-scalable/
// https://www.freecodecamp.org/news/optimize-search-queries-in-mongodb/

const Users = require('../models/users.model');
const BCRYPT = require("bcrypt");
const SALTROUNDS = 12

async function createUser(req, res) {
    try {
        const body = req.body;

        let salt_pass = BCRYPT.genSaltSync(SALTROUNDS);
        let hashed_pass = BCRYPT.hashSync(body.password, salt_pass);

        const doc = {
            name: body.name,
            email: body.email,
            password: hashed_pass
        };

        const users = await Users.create(doc);
        await Users.ensureIndexes({email: body.email});

        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);

        const data = {
            status: false,
            message: "Failed to insert a user."
        }
        return res.status(500).json(data);
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.user_id;
        const body = req.body;

        let doc = {};

        if(body.password) {
            let salt_pass = BCRYPT.genSaltSync(SALTROUNDS);
            let hashed_pass = BCRYPT.hashSync(body.password, salt_pass);

            doc = {
                name: body.name,
                email: body.email,
                password: hashed_pass
            };
        }
        else {
            doc = {
                name: body.name,
                email: body.email,
            };
        }

        const users = await Users.findByIdAndUpdate(id, doc);

        if(!users) {
            const data = {
                status: false,
                message: "User not found."
            };

            return res.status(404).json(data);
        }

        const result = await Users.findById(id);

        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);

        const data = {
            status: false,
            message: "Failed to update a user."
        };

        return res.status(500).json(data);
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.user_id;

        const users = await Users.findByIdAndDelete(id);

        if(!users) {
            const data = {
                status: false,
                message: "User not found."
            };

            return res.status(404).json(data);
        }

        const result = {
            status: true,
            message: "Successfuly deleted the user"
        };

        return res.status(200).json(result);
    }
    catch (error) {
        console.log(error);

        const data = {
            status: false,
            message: "Failed to delete a user."
        };

        return res.status(500).json(data);
    }
}

async function bulkWriteUser(req, res) {
    try {
        const bodyArray = req.body;

        let dataArr = [];

        bodyArray.forEach(element => {

            let command = element.command;
            let payload = element.payload;
            let filter = element.filter;

            const commandObj = new Object();

            if(command === "insertOne") {

                commandObj[`${command}`] = {
                    document: payload
                }

                dataArr.push(commandObj);
            }
            else {
                commandObj[`${command}`] = {
                    filter: filter,
                    update: payload
                }

                dataArr.push(commandObj);
            }
        });

        const bulkUser = await Users.bulkWrite(dataArr);

        const result = {
            status: true,
            data: bulkUser
        };

        return res.status(201).json(result)
    }
    catch (error) {
        console.log(error);

        const data = {
            status: false,
            message: "Failed to bulk write user(s)."
        };

        return res.status(500).json(data)

    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    bulkWriteUser,
}