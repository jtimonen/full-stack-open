import React from 'react'

const Blog = ({ blog }) => (
  <div>
    <li>
    <span className='titles'> {blog.title}:</span> 
    <span className='authors'> {blog.author}</span>, 
    <span className='likes'> {blog.likes} likes</span>,
    <span className='adder'> from <i>{blog.user.username}</i></span>
    </li>
  </div>
)

export default Blog
