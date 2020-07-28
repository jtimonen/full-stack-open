import React, { useState } from 'react'
import DeleteButton from './DeleteButton'

const BlogHeader = ( { blog, button }) => (
  <div>
    <span className='authors'>{blog.author}: </span>
    <span className='titles'>{blog.title} </span>
    <button onClick={button.onClick} className="normalbutton">{button.text}</button>
  </div>
)

const BlogBody = ( { blog, opened, clickLike, clickDelete, user }) => {
  if(!opened){
    return(null)
  }
  return(
    <div>
      <div className='blogLikes'>
        {blog.likes} likes <button onClick={clickLike} className="likebutton">like</button>
      </div>
      <div className='blogAdder'>added by {blog.user.username}</div>
      <div className='blogUrl'> {blog.url}</div>
      <DeleteButton blog={blog} user={user} onClick={clickDelete}></DeleteButton>
    </div>
  )
}

const Blog = ({ blog, saveLikeFun, deleteFun, user }) => {

  const [opened, setOpened] = useState(false)
  const clickView = () => setOpened(true)
  const clickClose = () => setOpened(false)
  let blogButton = { onClick: clickView, text: 'view' }
  if(opened){
    blogButton = { onClick: clickClose, text: 'close' }
  }
  const clickLikeFun = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    saveLikeFun(newBlog)
  }
  const clickDeleteFun = () => {
    deleteFun(blog)
  }
  return(
    <div className='bordered'>
      <BlogHeader blog={blog} opened={opened} button={blogButton}></BlogHeader>
      <BlogBody blog={blog} opened={opened} clickLike={clickLikeFun} clickDelete={clickDeleteFun} user={user}></BlogBody>
    </div>
  )

}

export default Blog
