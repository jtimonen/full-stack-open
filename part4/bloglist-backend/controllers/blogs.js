const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {

    // Decode token
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    // Find user corresponding to the token
    const user = await User.findById(decodedToken.id)

    // Create the blog object using Mongoose schema
    const body = request.body
    const blog = new Blog({ ...body, user: user._id, likes: 0 })

    // Save the blog
    const savedBlog = await blog.save()
    if (savedBlog) {
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } else {
        response.status(400) // bad request
    }
})

blogRouter.delete('/:id', async (request, response) => {

    // Decode token
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    // Remove blog
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        // Check if blog was created by the authenticated user
        const str1 = blog.user.toString()
        const str2 = decodedToken.id
        if (str1 === str2) {
            await Blog.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).json({ error: 'blog was not created by this user!' })
        }
    } else {
        response.status(404).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newBlogContent = {
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
    }
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        await Blog.findByIdAndUpdate(request.params.id, newBlogContent, { new: true })
        response.status(204).end()
    } else {
        response.status(404).end()
    }

})

module.exports = blogRouter
