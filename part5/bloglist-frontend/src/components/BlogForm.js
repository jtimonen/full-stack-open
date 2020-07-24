import React from 'react'

const BlogForm = (props) => {
    if (props.user === null) {
        return (null)
    }

    return (
        <div>
            <h2>Add new</h2>
            <form onSubmit={props.addBlogFun}>
                <div> title
      <input type="text" name='Title' value={props.newBlogTitle} onChange={({ target }) => props.titleChangeFun(target.value)} />
                </div>
                <div> author
      <input type="text" name='Author' value={props.newBlogAuthor} onChange={({ target }) => props.authorChangeFun(target.value)} />
                </div>
                <div> url
      <input type="text" name='URL' value={props.newBlogUrl} onChange={({ target }) => props.urlChangeFun(target.value)} />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm