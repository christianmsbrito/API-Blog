require('dotenv').config();
const db = require('../../src/_shared/database/database.connector');
db.connect();
const request = require('supertest');
const app = require('../../src/app')(process.env.ENVIRONMENT);

describe('User', () => {
    const { User } = require('../../src/models/user.model');

    it('should create a user directly from database', async () => {

        const user = await User.create({ name: 'Christian' });

        expect(user).toHaveProperty('createdAt');
    });

    it('should create  a user using route', async () => {
        const user = await request(app.callback()).post('/api/v1/users/signup').send({ name: 'Teste' }).set('Content-Type', 'application/json');

        expect(user.status).toBe(201);
    });

    (async () => {
        await User.deleteMany({});
        db.close();
    })()
});