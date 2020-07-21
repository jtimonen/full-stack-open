const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const testData = require('./test_data')
const helper = require('./test_helper')
const Blog = require('../models/blog')

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

// DELETE -----------------------------------------------------

describe('4.13: DELETE requests', () => {

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length - 1)
    })

    test('DELETE request with invalid id does not delete anything and returns 400', async () => {

        await api
            .delete('/api/blogs/123')
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length)
    })

})

// PUT ----------------------------------------------------------

describe('4.14*: PUT requests', () => {

    test('a valid PUT request returns 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length)
    })

    test('a blog cannot be updated after deleting it', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        await api.delete(`/api/blogs/${blog.id}`)

        await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(testData.longBlogList.length - 1)
    })

    test('a PUT request with invalid id returns 400', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        await api
            .put('/api/blogs/123')
            .send(blog)
            .expect(400)

    })

    test('likes can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const newContent = {...blogToUpdate, likes: blogToUpdate.likes + 1}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newContent)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
    })

})

// AFTER ALL --------------------------------------------------

afterAll(() => {
    mongoose.connection.close()
})
