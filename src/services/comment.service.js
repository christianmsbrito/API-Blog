const mongoose = require('mongoose')
const { User } = require('../models/comment.model');

class Controller {
    async create(payload) {
        return User.create(payload);
    }

    async update(id, payload) {
        return User.updateOne(mongoose.mongo.ObjectId(id), payload);
    }

    async list(condition) {
        return  User.find(condition);
    }

    async getById(id) {        
        return User.findOne({ _id: mongoose.Types.ObjectId(id) });
    }

    async remove(id) {
        return User.delete({ _id: mongoose.mongo.ObjectId(id) });
    }
}

module.exports = new Controller();