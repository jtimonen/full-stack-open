import React from 'react'

const Blog = ({ blog }) => (
    <tr>
    <td className='titles'>  {blog.title} </td>
    <td className='authors'> {blog.author} </td>
    <td className='likes'> {blog.likes} </td>
    <td className='adder'> {blog.user.username} </td>
    </tr>
)

export default Blog
