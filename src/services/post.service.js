const mongoose = require('mongoose')
const { Post } = require('../models/post.model');

class Controller {
    async create(payload) {
        console.log(payload);
        return Post.create(payload);
    }

    async update(id, payload) {
        return Post.updateOne(mongoose.mongo.ObjectId(id), payload);
    }

    async list(condition, pagination) {        
        return  Post.find(condition)
                    .skip(pagination.skip)
                    .limit(pagination.limit);
    }

    async getById(id) {        
        return Post.findOne({ _id: mongoose.Types.ObjectId(id) });
    }

    async remove(id) {
        return Post.delete({ _id: mongoose.mongo.ObjectId(id) });
    }
}

module.exports = new Controller();