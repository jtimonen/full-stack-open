const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const testData = require('./test_data')
const Blog = require('../models/blog')
const helper = require('./test_helper')

// BEFORE ALL -------------------------------------------------

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testData.longBlogList)
})

// GET --------------------------------------------------------

describe('4.8: GET requests', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(testData.longBlogList.length)
    })

    test('the first blog has 7 likes', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].likes).toBe(7)
    })

})

describe('4.9*: JSON format', () => {
    test('blogs are identified by id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })
})

// POST -------------------------------------------------------

describe('4.10: valid POST requests', () => {

    const newBlog = {
        author: 'Juho Timonen',
        title: 'This is not a blog',
        url: 'www.notablog.com',
        likes: 0
    }

    test('a completely defined valid blog can be added ', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length + 1)
    })

})

describe('4.11*: POST request without defining likes', () => {

    const newBlog = {
        author: 'Juho Timonen',
        title: 'This is not a blog',
        url: 'www.notablog.com',
    }

    test('a blog can be added without defining likes', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length + 1)
    })

    test('likes is set to zero if not defined', async () => {
        const moi = await api.post('/api/blogs').send(newBlog)
        expect(moi.body.likes).toBe(0)
    })

})

describe('4.12*: POST request without defining title or url', () => {

    const newBlog1 = {
        author: 'Juho Timonen',
        url: 'www.notablog.com',
    }
    const newBlog2 = {
        author: 'Juho Timonen',
        title: 'This is not a blog',
        likes: 8,
    }

    test('a blog cannot be added when title is missing', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog1)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length)
    })

    test('a blog cannot be added when url is missing', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length)
    })

})

// AFTER ALL --------------------------------------------------

afterAll(() => {
    mongoose.connection.close()
})

