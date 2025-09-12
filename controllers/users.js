const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
      
const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then(users => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id); 
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then(users => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const create = async (req, res) => {
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    // Validate all fields are present
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.favoriteColor || !newUser.birthday) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }

    const result = await mongodb.getDatabase().db().collection('users').insertOne(newUser);
    res.status(201).json({ id: result.insertedId });
};

const update = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    // Validate all fields are present
    if (!updatedUser.firstName || !updatedUser.lastName || !updatedUser.email || !updatedUser.favoriteColor || !updatedUser.birthday) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }

    const result = await mongodb.getDatabase().db().collection('users').updateOne(
        { _id: userId },
        { $set: updatedUser }
    );

    if (result.matchedCount === 0) {
        res.status(404).json({ message: "Contact not found." });
        return;
    }

    res.status(204).send();
};

const remove = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
        res.status(404).json({ message: "Contact not found." });
        return;
    }

    res.status(204).send();
};

module.exports = {
  getAll,
  getSingle,
  create,
  update,
  remove
};
