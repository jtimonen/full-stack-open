var lodash = require('lodash')

// 4.3
const dummy = () => {
    return 1
}

// 4.4
const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes += element.likes
    })
    return likes
}

// 4.5*
const favouriteBlog = (blogs) => {

    const reducer = (best, current) => {
        if(current.likes > best.likes){
            return current
        }else{
            return best
        }
    }
    const best = blogs.reduce(reducer)
    return { title: best.title, author: best.author, likes: best.likes }
}

// 4.6*
const mostBlogs = (blogs) => {
    const counts = lodash.countBy(blogs, 'author')
    const mapFun = element => {
        return { author: element[0], blogs: element[1] }
    }
    const vals = Object.entries(counts).map(mapFun)
    const sorted = lodash.sortBy(vals, 'blogs')
    return sorted[sorted.length - 1]
}


// 4.7*
const countLikesByAuthor = (group) => {
    let likes = 0
    group.forEach(element => {
        likes += element.likes
    })
    return likes
}

const mostLikes = (blogs) => {
    const groups = Object.entries(lodash.groupBy(blogs, 'author'))
    const mapFun = group => {
        return { author: group[0], likes: countLikesByAuthor(group[1]) }
    }
    const vals = groups.map(mapFun)
    const sorted = lodash.sortBy(vals, 'likes')
    return sorted[sorted.length - 1]
}


module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
