const dateFilter = require('../_shared/query-date.helper');

const { onSuccess, onCreated, onDeleted, onError, onUnathorized } = require('../_shared/handlers/index');

const postService = require('../services/post.service');
const commentService = require('../services/comment.service');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const created = await postService.create(body);

            onCreated(ctx, created);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            const created = await postService.update(id, body);

            onSuccess(ctx, created);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async list(ctx) {
        try {
            const { query } = ctx.request;

            const filters = { ...dateFilter(query) };

            if (query.title && query.title.length >= 4) {
                filters.title = {
                    $regex: new RegExp(`.*${query.title}.*`, 'gi')
                }
            }

            if (query.tags) {
                filters.tags = {
                    $in: query.tags.split(',')
                }
            }

            const pagination = {
                skip: Number(query.skip) || 0,
                limit: Number(query.limit) || 20
            }

            const posts = await postService.list(filters, pagination);

            onSuccess(ctx, posts);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async listComments(ctx) {
        try {
            const { query } = ctx.request;
            const { id } = ctx.params;

            const pagination = {
                skip: Number(query.skip) || 0,
                limit: Number(query.limit) || 20
            }

            const comments = await commentService.list({ post: id }, pagination);

            onSuccess(ctx, comments);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const user = await postService.getById(id);

            onSuccess(ctx, user);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            const post = await postService.getById(id);

            if(post.author != ctx.userId) {
                return onUnathorized(ctx, 'Only the post original author can remove!');
            }

            await postService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            console.log(err.stack);
            onError(ctx, err.message);
        }
    }
}

module.exports = new Controller();