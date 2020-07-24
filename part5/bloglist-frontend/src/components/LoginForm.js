import React from 'react'

const LoginForm = (props) => {
    if (props.user !== null) {
        return (null)
    }

    const fun1 = ({ target }) => props.setUsernameFun(target.value)
    const fun2 = ({ target }) => props.setPasswordFun(target.value)

    return (
        <div>
            <h2>Login to application</h2>
            <form onSubmit={props.handleLoginFun}>
                <table>
                    <thead>
                    </thead>
                <tbody>
                <tr> 
                    <td>Username</td>
                    <td>
                        <input type="text" value={props.username} name="Username" onChange={fun1}/> 
                    </td>
                </tr>
                <tr> 
                    <td>Password</td> 
                    <td>
                        <input type="password" value={props.password} name="Password" onChange={fun2}/>
                    </td>
                </tr>
                </tbody>
                </table>
                <button type="submit">login</button>
            </form>
        </div>
    )
}


export default LoginForm
