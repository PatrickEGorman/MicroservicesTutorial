import mongoose from "mongoose";
import {MongoMemoryServer} from 'mongodb-memory-server';
import request from "supertest";
import {app} from "../app";

declare global {
    namespace NodeJS {
        interface Global {
            signup(): Promise<string[]>
        }
    }
}

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'fdgfg';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})

global.signup = async () => {
    const email = 'test@test.test';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email, password
        })
        .expect(201);

    return response.get('Set-Cookie');
}