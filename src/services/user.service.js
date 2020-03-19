const mongoose = require('mongoose')
const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');

class Controller {
    async create(payload) {
        payload.password = bcrypt.hashSync(payload.password, 10);
        return User.create(payload);
    }

    async update(id, payload) {
        return User.updateOne(mongoose.mongo.ObjectId(id), payload);
    }

    async list(condition, pagination) {
        return User.find(condition)
                   .skip(pagination.skip)
                   .limit(pagination.limit)
                   .select('-password');
    }

    async findOne(condition) {
        return User.findOne(condition)
                   .select('-password');
    }

    async getLoginData(condition) {
        return User.findOne(condition);
    }

    async getById(id) {
        return User.findOne({ _id: mongoose.Types.ObjectId(id) })
                   .select('-password');
    }

    async remove(id) {
        return User.delete({ _id: mongoose.mongo.ObjectId(id) });
    }
}

module.exports = new Controller();