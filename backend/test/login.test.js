const app = require('../app')
const mockserver = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../model/user')
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB')
const setupGoogleSuccessResponse = require('./util/httpMock')


describe('/api/dashboards/get tests', async() => {
    
    let connection;
    let mongod;
    let client;

    beforeAll(async () => {
        const result = await startDB();
        mongod = result[0];
        connection = result[1];
        client = mockserver.agent(app);
        // client.set('authorization', newUser._id);
    });

    afterEach(async () => {
        await deleteAll(User);
    });

    afterAll(async () => {
        await stopDB(mongod, connection);
    });

    it('should return jwt token with provider data (user not created)', async () => {
        // given
        const code = "random";
        const provider = "github";
    
        // when
        const response = await client.post('/api/user/login').send({
            code,
            provider
        });
        
        // then
        expect(response.status).toBe(200);    
        // await connection.disconnect();
        // await mongod.stop();
    });
    
    it('should return jwt token with provider data (user not created)', async () => {
        // given
        const code = "random";
        const provider = "google";
    
        setupGoogleSuccessResponse();
        // when
        const response = await client.post('/api/user/login').send({
            code,
            provider
        });
        
        // then
        expect(response.status).toBe(200);    
        const responseToken = jwt.decode(rsponse.body);
        expect(responseToken.providers.google).toBe(googleUserId);
        const users = await User.find();
        expect(users).toStrictEqual([]);

        // await connection.disconnect();
        // await mongod.stop();
    });

    
})