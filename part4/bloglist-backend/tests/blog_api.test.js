const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const testData = require('./test_data')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(testData.longBlogList[0])
    await blogObject.save()

    blogObject = new Blog(testData.longBlogList[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('the first blog has 7 likes', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(7)
})

afterAll(() => {
    mongoose.connection.close()
})

