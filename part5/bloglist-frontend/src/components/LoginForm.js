import React from 'react'

const LoginForm = (props) => {
    if (props.user !== null) {
        return (null)
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={props.handleLoginFun}>
                <div>
                    username
        <input
                        type="text"
                        value={props.username}
                        name="Username"
                        onChange={({ target }) => props.setUsernameFun(target.value)}
                    />
                </div>
                <div>
                    password
        <input
                        type="password"
                        value={props.password}
                        name="Password"
                        onChange={({ target }) => props.setPasswordFun(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}


export default LoginForm
