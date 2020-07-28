import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LoginInfo from './components/LoginInfo'
import Togglable from './components/Togglable'
import VisibleWhenLogged from './components/VisibleWhenLogged'
import VisibleWhenNotLogged from './components/VisibleWhenNotLogged'
import Footer from './components/Footer'

const App = () => {

  // State hooks
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  // Effect hooks
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Refs
  const blogFormRef = useRef()

  // Login handler
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
  const saveBlog = async (blogToSave) => {

    const savedBlog = await blogService.create(blogToSave)
    blogFormRef.current.toggleVisibility()
    blogService.getAll()
      .then(blogs => { setBlogs(blogs) })
      .then(() => {
        setNotificationMessage(`Added '${savedBlog.title}' to the list!`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  // Like button click handler
  const saveLike = async (likedBlog) => {
    await blogService.update(likedBlog.id, likedBlog)
    blogService.getAll()
      .then(blogs => { setBlogs(blogs) })
      .then(() => {
        setNotificationMessage(`You liked '${likedBlog.title}'!`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  // Delete button click handler
  const deleteBlog = async (blogToDelete) => {
    await blogService.remove(blogToDelete.id)
    blogService.getAll()
      .then(blogs => { setBlogs(blogs) })
      .then(() => {
        setNotificationMessage(`Deleted blog '${blogToDelete.title}'!`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  return (
    <div>

      <LoginInfo user={user} logoutFun={onLogOutClick}></LoginInfo>

      <Notification message={errorMessage} type='error' />
      <Notification message={notificationMessage} type='notification' />

      <VisibleWhenNotLogged user={user}>
        <LoginForm handleLoginFun={handleLogin}> </LoginForm>
      </VisibleWhenNotLogged>

      <VisibleWhenLogged user={user}>
        <h2>Add new blog</h2>
        <Togglable buttonLabel="add new" ref={blogFormRef}>
          <BlogForm saveBlogFun={saveBlog}> </BlogForm>
        </Togglable>
      </VisibleWhenLogged>


      <BlogList blogs={blogs} user={user} saveLikeFun={saveLike} deleteFun={deleteBlog}></BlogList>
      <Footer></Footer>
    </div>
  )
}

export default App