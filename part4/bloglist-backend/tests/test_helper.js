const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const testUsers = [
    {
        name: 'Kalle Käyttäjä',
        username: 'kalle999',
        password: 'kalasana'
    },
    {
        name: 'Juho Timonen',
        username: 'timse',
        password: 'salainen'
    }
]

const testBlogList0 = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }, {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    },
]

const testBlogList1 = [
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
]

const beforeEachFun = async (api) => {

    // Delete all blogs and users
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create two users
    await api.post('/api/users').send(testUsers[0])
    await api.post('/api/users').send(testUsers[1])

    // Get user tokens
    const login0 = await api.post('/api/login').send(testUsers[0])
    const login1 = await api.post('/api/login').send(testUsers[1])
    const token0 = `bearer ${login0.body.token}`
    const token1 = `bearer ${login1.body.token}`

    // Create blogs for first user
    await api.post('/api/blogs').send(testBlogList0[0]).set('Authorization', token0)
    await api.post('/api/blogs').send(testBlogList0[1]).set('Authorization', token0)
    await api.post('/api/blogs').send(testBlogList0[2]).set('Authorization', token0)
    await api.post('/api/blogs').send(testBlogList0[3]).set('Authorization', token0)

    // Create blogs for second user
    await api.post('/api/blogs').send(testBlogList1[0]).set('Authorization', token1)
    await api.post('/api/blogs').send(testBlogList1[1]).set('Authorization', token1)

    return [token0, token1]
}

module.exports = {
    blogsInDb, usersInDb, testUsers, testBlogList0, testBlogList1, beforeEachFun
}
