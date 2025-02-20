const request = require('supertest');
const app = require('../app'); // Import your Express app
const StudyGroup = require('../models/StudyGroup');
const User = require('../models/User');
const { connectDB, disconnectDB } = require('../utils/db');

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

describe('Study Group Controller Tests', () => {
    let token;

    beforeEach(async () => {
        await StudyGroup.deleteMany({});
        await User.deleteMany({});

        // Register a user and get a token
        const registerRes = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                branch: 'Computer Science',
                year: '2',
                interests: ['Programming', 'Algorithms'],
            });

        token = registerRes.body.token;
    });

    test('Create a new study group', async () => {
        const res = await request(app)
            .post('/api/study-groups/create')
            .set('x-auth-token', token)
            .send({
                name: 'Advanced Programming',
                subject: 'Programming',
                preferredTimes: ['Morning', 'Evening'],
                location: 'Library',
                mode: 'hybrid',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('name', 'Advanced Programming');
    });

    test('Join a study group', async () => {
        const createRes = await request(app)
            .post('/api/study-groups/create')
            .set('x-auth-token', token)
            .send({
                name: 'Advanced Programming',
                subject: 'Programming',
                preferredTimes: ['Morning', 'Evening'],
                location: 'Library',
                mode: 'hybrid',
            });

        const groupId = createRes.body._id;

        const res = await request(app)
            .post(`/api/study-groups/${groupId}/join`)
            .set('x-auth-token', token);

        expect(res.statusCode).toBe(200);
        expect(res.body.members).toContain(createRes.body.creator);
    });

    test('Get study group details', async () => {
        const createRes = await request(app)
            .post('/api/study-groups/create')
            .set('x-auth-token', token)
            .send({
                name: 'Advanced Programming',
                subject: 'Programming',
                preferredTimes: ['Morning', 'Evening'],
                location: 'Library',
                mode: 'hybrid',
            });

        const groupId = createRes.body._id;

        const res = await request(app)
            .get(`/api/study-groups/${groupId}`)
            .set('x-auth-token', token);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name', 'Advanced Programming');
    });
});