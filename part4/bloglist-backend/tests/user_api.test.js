const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

// BEFORE EACH -------------------------------------------------
let token0 = 'undefined'
let token1 = 'undefined'

beforeEach(async () => {

    // Delete all blogs and users
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create two users
    await api.post('/api/users').send(helper.testUsers[0])
    await api.post('/api/users').send(helper.testUsers[1])

    // Get user tokens
    const login0 = await api.post('/api/login').send(helper.testUsers[0])
    const login1 = await api.post('/api/login').send(helper.testUsers[1])
    token0 = `bearer ${login0.body.token}`
    token1 = `bearer ${login1.body.token}`

    // Create blogs for first user
    const testBlogList0 = helper.testBlogList0
    await api.post('/api/blogs').send(testBlogList0[0]).set('Authorization', token0)
    await api.post('/api/blogs').send(testBlogList0[1]).set('Authorization', token0)
    await api.post('/api/blogs').send(testBlogList0[2]).set('Authorization', token0)
    await api.post('/api/blogs').send(testBlogList0[3]).set('Authorization', token0)

    // Create blogs for second user
    const testBlogList1 = helper.testBlogList1
    await api.post('/api/blogs').send(testBlogList1[0]).set('Authorization', token1)
    await api.post('/api/blogs').send(testBlogList1[1]).set('Authorization', token1)
})

// ADDING USERS -------------------------------------------------------------

describe('4.16: invalid requests to user api', () => {

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: helper.testUsers[0].username,
            name: 'Timo Timonen',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum allowed length')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mangusti',
            name: 'Superuser',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is too short')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('4.15: valid requests to user api', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

})


// AFTER ALL --------------------------------------------------

afterAll(() => {
    mongoose.connection.close()
})
