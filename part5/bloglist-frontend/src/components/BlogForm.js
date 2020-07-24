import React from 'react'

const BlogForm = (props) => {
    if (props.user === null) {
        return (null)
    }

    const fun1 = ({ target }) => props.titleChangeFun(target.value)
    const fun2 = ({ target }) => props.authorChangeFun(target.value)
    const fun3 = ({ target }) => props.urlChangeFun(target.value)

    return (
        <div>
            <h2>Add new blog</h2>
            <form onSubmit={props.addBlogFun}>
                <table>
                    <thead>
                    </thead>
                <tbody>
                <tr> 
                    <td>Title</td>
                    <td>
                    <input type="text" name='Title' value={props.newBlogTitle} onChange={fun1} /> 
                    </td>
                </tr>
                <tr> 
                    <td>Author</td> 
                    <td>
                    <input type="text" name='Author' value={props.newBlogAuthor} onChange={fun2} />
                    </td>
                </tr>
                <tr> 
                    <td>URL</td> 
                    <td>
                    <input type="text" name='URL' value={props.newBlogUrl} onChange={fun3} />
                    </td>
                </tr>
                </tbody>
                </table>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm