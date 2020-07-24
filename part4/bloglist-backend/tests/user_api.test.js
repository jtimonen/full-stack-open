const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)
const mongoose = require('mongoose')
const testData = require('./test_data')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

// BEFORE EACH -------------------------------------------------

beforeEach(async () => {

    // Delete all blogs and users
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create one user
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
        _id: '5f174f0ef4c7353e80a184bd',
        name: 'admin',
        username: 'root',
        passwordHash
    })
    await user.save()

    // Create many blogs for that user
    for (let blog of testData.longBlogList) {
        let blogObject = new Blog(blog)
        const savedBlog = await blogObject.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    }

})


// ADDING USERS -------------------------------------------------------------

describe('4.16: invalid requests to user api', () => {

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
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
