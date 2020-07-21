const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({}).populate('blogs')
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
    const body = request.body
    const users = await User.find({})
    const user = users[0]
    const blog = new Blog({ ...body, user: user._id })

    const savedBlog = await blog.save()
    console.log(savedBlog)
    if (savedBlog) {
        response.json(savedBlog.toJSON())
    } else {
        response.status(400) // bad request
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
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
