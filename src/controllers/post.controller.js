const dateFilter = require('../_shared/query-date.helper');

const { onSuccess, onCreated, onDeleted, onError } = require('../_shared/handlers/index');

const postService = require('../services/post.service');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const created = await postService.create(body);

            onCreated(ctx, created);
        } catch (err) {
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
            onError(ctx, err);
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
            onError(ctx, err.message);
        }
    }

    async listComments(ctx) {
        try {
            const { query } = ctx.request;

            const pagination = {
                skip: Number(query.skip) || 0,
                limit: Number(query.limit) || 20
            }

            const comments = await postService.list(filters, pagination);

            onSuccess(ctx, comments);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const user = await postService.getById(id);

            onSuccess(ctx, user);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            await postService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controller();