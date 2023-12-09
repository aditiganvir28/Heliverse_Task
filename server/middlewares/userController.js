const asyncHandler = require('express-async-handler')
require('dotenv').config()
const mongoose = require('mongoose')
const Users = require('../models/user')
const Team = require('../models/team')
const user = require('../models/user')

const getAllUsers = asyncHandler(async (req, res) => {

    //Get all usersData from MongoDb
    try {
        const User = await Users.find()

        //If no usersData
        if (!User?.length) {
            return res.send({ message: 'No userData found' })
        }

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex = (page) * limit

        const results = {}
        results.totalUser = User.length;
        results.pageCount = Math.ceil(User.length / limit);

        if (lastIndex < User.length) {
            results.next = {
                page: page + 1,
            }
        }
        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
            }
        }
        results.result = User.slice(startIndex, lastIndex);
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

const getUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    try {
        //Get all usersData from MongoDb
        const User = await Users.find({ id: id })

        //If no usersData
        if (!User?.length) {
            return res.send({ message: 'No userData found' })
        }

        return res.send(userData)

    } catch (error) {
        console.log(error)
    }
});

const createNewUser = asyncHandler(async (req, res) => {
    const { id, first_name, last_name, email, gender, avatar, domain, available } = req.body;

    try {

        if (!id || !first_name || !last_name || !email || !gender || !avatar || !domain || !available) {
            return res.send({ message: 'All fields are required' });
        }

        const user = await Users.find({ id: id });

        if (user) {
            res.send({ message: 'Already user exists with this id' });
        }

        const userData = await Users.create({ id, first_name, last_name, email, gender, avatar, domain, available });

        if (userData) {
            console.log("New User Created");
            res.send({ message: "New User Created", userData })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params;
    const { first_name, last_name, email, gender, avatar, domain, available } = req.body;

    try {
        const user = await Users.findByIdAndUpdate(id, { first_name, last_name, email, gender, avatar, domain, available }, { new: true });
        res.send({ message: "User is updated", user });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params;

    try {
        const user = await Users.findByIdAndDelete(id);
        res.send({ message: "User is updated", user });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

const searchUser = asyncHandler(async (req, res) => {
    const { names, domain, gender, available } = req.body;

    try {
        let users = await Users.find();

        if (users && names && names.length > 0) {
            console.log("reached")
            users = users.filter(user => user.first_name.toLowerCase().startsWith(names.toLowerCase()));
        }

        if (users && domain && domain.length > 0) {
            users = users.filter(user => user.domain && domain.includes(user.domain));
        }

        if (users && gender && gender.length > 0) {
            users = users.filter(user => user.gender && gender.includes(user.gender));
        }

        if (users && available && available.length > 0) {
            users = users.filter(user => user.available && available.includes(user.available));
        }

        // if (users.length === 0) {
        //     return res.send({ message: "No users found matching the domain criteria" });
        // }

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex = (page) * limit

        const results = {}
        results.totalUser = users.length;
        results.pageCount = Math.ceil(users.length / limit);

        if (lastIndex < users.length) {
            results.next = {
                page: page + 1,
            }
        }
        if (startIndex > 0) {
            results.prev = {
                page: page - 1,
            }
        }

        results.result = users.slice(startIndex, lastIndex);
        res.json(results)

        // return res.send({ message: "Users found", users });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
})

const createTeam = asyncHandler(async (req, res) => {
    const team = req.body.team;

    try {

        const user = await Users.find({ id: { $in: team } });

        const team_size = await Team.countDocuments();

        const newTeam = new Team({
            team_no: team_size + 1,
            users: user.map(user => user._id),
        });

        await newTeam.save();

        res.send({ message: "team created", user })
    } catch (err) {
        console.log(err)
    }
})

const getTeam = asyncHandler(async (req, res) => {
    const team_no = req.params.id

    try {
        const team = await Team.findOne({ team_no: team_no }).populate('users');

        if (!team) {
            return res.send({ message: "Team not found" });
        }

        return res.send({ message: "Users in team found", users: team });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
})

const getAllTeams = asyncHandler(async (req, res) => {
    console.log("reached")
    try {
        const teams = await Team.find().populate('users');

        console.log(teams)

        if (!teams || teams.length === 0) {
            return res.send({ message: "No teams found" });
        }

        // teams.forEach(team => {
        //     console.log(`Team Number: ${team.team_no}`);
        //     console.log("Users in this team:");
        //     team.users.forEach(user => {
        //         console.log(user); // Output user details associated with this team
        //     });
        // });

        return res.send(teams); // Send the teams array with users to the frontend
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal server error", err });
    }
});



module.exports = { getAllUsers, getUser, createNewUser, updateUser, deleteUser, searchUser, createTeam, getTeam, getAllTeams }
