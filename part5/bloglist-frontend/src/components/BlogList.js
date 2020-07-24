import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, user}) => {

    if(user===null){
        return(null)
    }
    return (
        <div>
        <h2>Blogs</h2>
        <table className='bordered'>
            <thead>
                <tr>
                <td>Title</td><td>Author</td><td>Likes</td><td>Added by</td>
                </tr>
            </thead>
            <tbody>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
            </tbody>
        </table>
        </div>
)

}

export default BlogList
