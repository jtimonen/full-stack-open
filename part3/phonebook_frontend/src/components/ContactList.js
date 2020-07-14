import React from 'react'


const Contact = (props) => {
    return(
      <div>
        {props.name}: {props.number} <button onClick={props.deleteFun} name={props.name} id={props.id}>Delete</button>
      </div>
    )
}


const ContactList = (props) => {

  const contactsToShow = props.contacts.filter(
    contact => contact.name.toLowerCase().includes(props.filter.toLowerCase())
  )

  const mapper = (contact) => {
    return(
      <Contact key={contact.id} id={contact.id} name={contact.name} number={contact.number} deleteFun={props.deleteFun}></Contact>
    )
  }

  return(
    <div> {contactsToShow.map(mapper)} </div>
  )
}

export default ContactList
