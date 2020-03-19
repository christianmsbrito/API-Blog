const { onSuccess, onCreated, onDeleted, onError } = require('../_shared/handlers/index');

const commentService = require('../services/comment.service');

class Controller {
    async create(ctx) {
        try {
            const { body } = ctx.request;

            const created = await commentService.create(body);

            onCreated(ctx, created);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async update(ctx) {
        try {
            const { id } = ctx.params;
            const { body } = ctx.request;

            const created = await commentService.update(id, body);

            onSuccess(ctx, created);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async list(ctx) {
        try {
            const { query } = ctx.request;

            const users = await commentService.list(query);

            onSuccess(ctx, users);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async getById(ctx) {
        try {
            const { id } = ctx.params;

            const user = await commentService.getById(id);

            onSuccess(ctx, user);
        } catch (err) {
            onError(ctx, err);
        }
    }

    async remove(ctx) {
        try {
            const { id } = ctx.params;

            await commentService.remove(id);

            onDeleted(ctx);
        } catch (err) {
            onError(ctx, err);
        }
    }
}

module.exports = new Controller();