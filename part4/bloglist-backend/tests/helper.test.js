const listHelper = require('../utils/list_helper')
const testData = require('./test_data')

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
        const result = listHelper.totalLikes(testData.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('totalLikes works for a longer list', () => {
        const result = listHelper.totalLikes(testData.longBlogList)
        expect(result).toBe(36)
    })
})

describe('4.5*: favourite blog', () => {

    test('favouriteBlog works for a list with one element', () => {
        const result = listHelper.favouriteBlog(testData.listWithOneBlog)
        const expectedResult = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expectedResult)
    })

    test('favouriteBlog works for a long list', () => {
        const result = listHelper.favouriteBlog(testData.longBlogList)
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
        const result = listHelper.mostBlogs(testData.listWithOneBlog)
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        expect(result).toEqual(expectedResult)
    })

    test('mostBlogs works for a longer list', () => {
        const result = listHelper.mostBlogs(testData.longBlogList)
        const expectedResult = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expectedResult)
    })

})

describe('4.7*: most likes', () => {

    test('mostLikes works for a list with one element', () => {
        const result = listHelper.mostLikes(testData.listWithOneBlog)
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expectedResult)
    })

    test('mostLikes works for a longer list', () => {
        const result = listHelper.mostLikes(testData.longBlogList)
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expectedResult)
    })

})