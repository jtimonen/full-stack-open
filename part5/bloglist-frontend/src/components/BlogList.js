import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, user, saveLikeFun, deleteFun }) => {

  if (user === null) {
    return (null)
  }

  const mapFun = blog => {
    return (
      <Blog key={blog.id} blog={blog} saveLikeFun={saveLikeFun} deleteFun={deleteFun} user={user}/>
    )
  }

  const compareFun = (a, b) => {
    const likes1 = a.props.blog.likes
    const likes2 = b.props.blog.likes
    return(likes2 - likes1)
  }

  const sortedBlogs = blogs.map(mapFun).sort(compareFun)
  return (
    <div>
      <h2>Blogs</h2>
      {sortedBlogs}
    </div>
  )

}

export default BlogList
