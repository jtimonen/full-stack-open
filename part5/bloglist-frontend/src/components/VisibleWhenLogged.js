import React from 'react'

const VisibleWhenLogged = (props) => {

  const visible = (props.user !== null)
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={showWhenVisible}>
      {props.children}
    </div>
  )
}

export default VisibleWhenLogged
