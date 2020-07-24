import React from 'react'

const LoginInfo = ({ user, logoutFun }) => {
    if (user === null) {
        return (null)
    }
    return (
        <div className='login'>
            Logged in as {user.username} ({user.name}) <button onClick={logoutFun}>logout</button>
        </div>
    )
}

export default LoginInfo

