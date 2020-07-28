import React, { useState } from 'react'

const BlogForm = ({ saveBlogFun }) => {

  // State hooks
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  // Event handlers for typing input
  const fun1 = ({ target }) => setNewBlogTitle(target.value)
  const fun2 = ({ target }) => setNewBlogAuthor(target.value)
  const fun3 = ({ target }) => setNewBlogUrl(target.value)

  // Event handler for clicking "save"
  const addBlog = (event) => {
    event.preventDefault()
    const blogToAdd = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    saveBlogFun(blogToAdd)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>Title</td>
              <td>
                <input type="text" name='Title' value={newBlogTitle} onChange={fun1}/>
              </td>
            </tr>
            <tr>
              <td>Author</td>
              <td>
                <input type="text" name='Author' value={newBlogAuthor} onChange={fun2}/>
              </td>
            </tr>
            <tr>
              <td>URL</td>
              <td>
                <input type="text" name='URL' value={newBlogUrl} onChange={fun3}/>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="normalbutton">save</button>
      </form>
    </div>
  )
}

export default BlogForm