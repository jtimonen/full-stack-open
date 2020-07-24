import React from 'react'

const LoginInfo = ({ user, logoutFun }) => {
    if (user === null) {
        return (null)
    }
    return (
        <div>
            Logged in as {user.username} ({user.name}) <button onClick={logoutFun}>Log out</button>
        </div>
    )
}

export default LoginInfo

