const { onSuccess, onCreated, onDeleted, onError } = require('../_shared/handlers/index');

const commentService = require('../services/comment.service');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const created = await commentService.create(body);

            onCreated(ctx, created);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            const created = await commentService.update(id, body);

            onSuccess(ctx, created);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async list(ctx) {
        try {
            const { query } = ctx.request;

            const comments = await commentService.list(query);

            onSuccess(ctx, comments);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const comment = await commentService.getById(id);

            onSuccess(ctx, comment);
        } catch (err) {
            onError(ctx, err.message);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            await commentService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            onError(ctx, err.message);
        }
    }
}

module.exports = new Controller();