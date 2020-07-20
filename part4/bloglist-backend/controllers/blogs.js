const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({})
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
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    if (savedBlog){
        response.json(savedBlog.toJSON())
    } else {
        response.status(400) // bad request
    }
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter
