import React from 'react'

const DeleteButton = (props) => {

  // Hide if logged user is no the same as the one that added this blog
  const id1 = props.user.username
  const id2 = props.blog.user.username
  const hide = (id1 !== id2)
  if (hide) {
    return null
  }

  // Else show the button
  return (
    <div>
      <button onClick={props.onClick} className="deletebutton">delete</button>
    </div>
  )
}


export default DeleteButton