import request from "supertest";
import {app} from "../../app";

it("returns 201 on a succesffulr signup", async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
})

it("returns a 400 with an invalid email", () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testestom',
            password: 'password'
        })
        .expect(400);
})


it("returns a 400 with an invalid password", () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testestom',
            password: 'a'
        })
        .expect(400);
})

it("returns a 400 with amissing email and password", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({email: "test@test.com"})
        .expect(400);
    return request(app)
        .post('/api/users/signup')
        .send({password: "jdfsklsd"})
        .expect(400);
})

it("returns 201 on a succesffulr signup", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
})

it('sets a cookie after singup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-cookie')).toBeDefined()
})