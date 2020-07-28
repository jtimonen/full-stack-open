import React, { useState } from 'react'


const LoginForm = (props) => {

  // State hooks
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Event handlers for typing input
  const fun1 = ({ target }) => setUsername(target.value)
  const fun2 = ({ target }) => setPassword(target.value)

  // Login event handler
  const handleLogin = (event) => {
    event.preventDefault()
    props.handleLoginFun(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
              <td>Username</td>
              <td>
                <input type="text" value={username} name="Username" onChange={fun1} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="password" value={password} name="Password" onChange={fun2} />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="normalbutton">login</button>
      </form>
    </div>
  )
}


export default LoginForm
