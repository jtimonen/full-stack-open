import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LoginInfo from './components/LoginInfo'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  // Effect hooks
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Logout handler
  const onLogOutClick = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  // Blog add handler
  const addBlog = async (event) => {
    event.preventDefault()
    const blogToAdd = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    const addedBlog = await blogService.create(blogToAdd)

    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    }).then(() => {
      setNotificationMessage(`Added '${addedBlog.title}' to the list!`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
    )

  }

  return (
    <div>

      <LoginInfo user={user} logoutFun={onLogOutClick}></LoginInfo>

      <Notification message={errorMessage} type='error'/>
      <Notification message={notificationMessage} type='notification'/>

      <LoginForm
        user={user}
        username={username}
        password={password}
        setUsernameFun={setUsername}
        setPasswordFun={setPassword}
        handleLoginFun={handleLogin}
      >
      </LoginForm>

      <BlogForm
        user={user}
        addBlogFun={addBlog}
        newBlogTitle={newBlogTitle}
        newBlogAuthor={newBlogAuthor}
        newBlogUrl={newBlogUrl}
        titleChangeFun={setNewBlogTitle}
        authorChangeFun={setNewBlogAuthor}
        urlChangeFun={setNewBlogUrl}>
      </BlogForm>

      <BlogList blogs={blogs} user={user}></BlogList>
    </div>
  )
}

export default App