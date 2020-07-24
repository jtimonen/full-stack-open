import React from 'react'

const Blog = ({ blog }) => (
  <div>
    <li>
    <span className='titles'> {blog.title}:</span> <span className='authors'> {blog.author}</span>
    </li>
  </div>
)

export default Blog
