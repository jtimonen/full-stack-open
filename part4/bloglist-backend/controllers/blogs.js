const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (_, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogRouter.delete('/:id', (request, response) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
})

module.exports = blogRouter
