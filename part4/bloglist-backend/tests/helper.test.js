const listHelper = require('../utils/list_helper')

const longBlogList = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }, {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    }, {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture', author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }
]

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

test('4.3: dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('4.4: total likes', () => {

    test('totalLikes returns zero for empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('totalLikes works for list of length one', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('totalLikes works for a longer list', () => {
        const result = listHelper.totalLikes(longBlogList)
        expect(result).toBe(36)
    })
})

describe('4.5*: favourite blog', () => {

    test('favouriteBlog works for a list with one element', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        const expectedResult = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expectedResult)
    })

    test('favouriteBlog works for a long list', () => {
        const result = listHelper.favouriteBlog(longBlogList)
        const expectedResult = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        }
        expect(result).toEqual(expectedResult)
    })

})

describe('4.6*: most blogs', () => {

    test('mostBlogs works for a list with one element', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        expect(result).toEqual(expectedResult)
    })

    test('mostBlogs works for a longer list', () => {
        const result = listHelper.mostBlogs(longBlogList)
        const expectedResult = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expectedResult)
    })

})

describe('4.7*: most likes', () => {

    test('mostLikes works for a list with one element', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expectedResult)
    })

    test('mostLikes works for a longer list', () => {
        const result = listHelper.mostLikes(longBlogList)
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expectedResult)
    })

})