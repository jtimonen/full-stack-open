import React from 'react'
import Blog from './Blog'

const BlogList = ({blogs, user}) => {

    if(user===null){
        return(null)
    }
    return (
        <div>
        <h2>Blogs</h2>
        <ol>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </ol>
        </div>
)

}

export default BlogList
