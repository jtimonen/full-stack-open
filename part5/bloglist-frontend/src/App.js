import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <ol>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </ol>
    </div>
  )
}

export default App