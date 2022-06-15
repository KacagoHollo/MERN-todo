require("dotenv").config();
const app = require('../app')
const jwt = require("jsonwebtoken");
const mockserver = require('supertest');
const User = require('../model/user')
const { startDB, stopDB, deleteAll } = require('./util/inMemoryDB')
const {setupGoogleSuccessResponse, setupGoogleErrorResponse} = require('./util/httpMock')


describe('POST requests to api/user/login', () => {
    
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
   
    afterAll(async () => {
        await stopDB(mongod, connection);
    });

    afterEach(async () => {
        await deleteAll(User);
    });

    test("should return 400 without body", async () => {
        // given
    
        // when
        const response = await client.post("/api/user/login").send({});
    
        // then
        expect(response.status).toBe(400);
      });
    
      test("should return 400 without provider", async () => {
        // given
        const code = "random";
    
        // when
        const response = await client.post("/api/user/login").send({ code });
    
        // then
        expect(response.status).toBe(400);
      });
    
      test("should return 400 without code", async () => {
        // given
        const provider = "github";
    
        // when
        const response = await client.post("/api/user/login").send({ provider });
    
        // then
        expect(response.status).toBe(400);
      });
    
      test("should return 400 with invalid provider (user not created)", async () => {
        // given
        const code = "random";
        const provider = "gitlab";
    
        // when
        const response = await client.post("/api/user/login").send({
          code,
          provider,
        });
    
        // then
        expect(response.status).toBe(400);
      });
    
      test("should return 200 with valid provider id (user not created)", async () => {
        // given
        const code = "4/0AX4XfWigRi0tflCcAhGM5WngKa5_199L1dJjayorTpuSj0z4AlQbnIyZSs78wBXHO3HG_g";
        const provider = "google";
        setupGoogleSuccessResponse("7458tygbhf78");
    
        // when
        const response = await client.post("/api/user/login").send({
          code,
          provider,
        });
    
        // then
        expect(response.status).toBe(200);
      });
    
      test("should return 200 with jwt valid provider id (user not created)", async () => {
        // given
        const code = "4/0AX4XfWigRi0tflCcAhGM5WngKa5_199L1dJjayorTpuSj0z4AlQbnIyZSs78wBXHO3HG_g";
        const provider = "google";
        const googleUserId = "vshdg674t7ryfgb";
        setupGoogleSuccessResponse(googleUserId);
    
        // when
        const response = await client.post("/api/user/login").send({
          code,
          provider,
        });
    
        // then
        expect(response.status).toBe(200);
        const responseToken = jwt.decode(response.body);
        expect(responseToken.providers.google).toBe(googleUserId);
        const users = await User.find();
        expect(users).toStrictEqual([]);
      });
    
      test("should return 401 with invalid code (user not created)", async () => {
        // given
        const code = "4/0AX4XfWigRi0tflCcAhGM5WngKa5_199L1dJjayorTpuSj0z4AlQbnIyZSs78wBXHO3HG_g";
        const provider = "google";
        setupGoogleErrorResponse();
    
        // when
        const response = await client.post("/api/user/login").send({
          code,
          provider,
        });
    
        // then
        expect(response.status).toBe(401);
        expect(response.body).toStrictEqual({});
        const users = await User.find();
        expect(users).toStrictEqual([]);
      });
    });
    