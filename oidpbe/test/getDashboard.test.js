const app = require('../app')
const mockserver = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../model/user')
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB')


describe('/api/dashboards/get tests', () => {
    
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

    test('new user get back an empty array', async () => {
        // given
        // const mongod = await MongoMemoryServer.create();
        // const uri = mongod.getUri();
        // const connection = await mongoose.connect(uri);
    
        const newUser = new User({ username: "macska", googleId: "1111000" })
        // const client = mockserver.agent(app);
        await newUser.save();

        client.set('authorization', newUser._id)
    
        // when
        const response = await client.get('/api/dashboards');
        
        // then
        expect(response.status).toBe(200);
        const responseData = response.body;
        expect(responseData.user.dashboards).toStrictEqual([]);
    
        // await connection.disconnect();
        // await mongod.stop();
    });

    test('deleted user receives nothing', async () => {
        // given
        // const mongod = await MongoMemoryServer.create();
        // const uri = mongod.getUri();
        // const connection = await mongoose.connect(uri);
    
        const newUser = new User({ username: "macska", googleId: "1111000" })
        // const client = mockserver.agent(app);
        await newUser.save();
        client.set('authorization', newUser._id);
        
        await User.deleteMany();

        
         // when
         const response = await client.get('/api/dashboards');

         // then
         const responseData = response.body;
         expect(response.status).toBe(200);
         expect(responseData.user).toBeNull();
     
        //  await connection.disconnect();
        //  await mongod.stop();
    })
})


