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

const nInitialBlogs = 6

// GET REQUESTS TO BLOG API --------------------------------------

describe('4.8: GET requests', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(nInitialBlogs)
    })

    test('the first blog has 0 likes', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].likes).toBe(0)
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
    }

    test('a completely defined valid blog can be added ', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', token0)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs + 1)
    })

})

describe('4.11*: POST request without defining likes', () => {

    const newBlog = {
        author: 'Juho Timonen',
        title: 'This is not a blog',
        url: 'www.notablog.com',
    }

    test('a blog can be added without defining likes', async () => {
        const sent = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', token1)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs + 1)
        expect(sent.body.likes).toBe(0)
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
            .set('Authorization', token1)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs)
    })

    test('a blog cannot be added when url is missing', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog2)
            .set('Authorization', token1)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs)
    })

})


// DELETE -----------------------------------------------------

describe('4.13 + 4.22: DELETE requests', () => {

    test('a blog can be deleted with proper user and authorization', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', token0)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs - 1)
    })

    test('DELETE request with invalid id does not delete anything and returns 400', async () => {

        await api
            .delete('/api/blogs/123')
            .set('Authorization', token0)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs)
    })

    test('a blog cannot be deleted by user who did not create it', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', token1)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs)
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
        expect(blogsAtEnd).toHaveLength(nInitialBlogs)
    })

    test('a blog cannot be updated after deleting it', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        await api.delete(`/api/blogs/${blog.id}`).set('Authorization', token0)

        await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(nInitialBlogs- 1)
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
        const newContent = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

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
