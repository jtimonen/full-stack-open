import React, { useState, useEffect } from 'react'
import ContactList from './ContactList'
import Filter from './Filter'
import InputForm from './InputForm'
import phoneNumberService from '../services/phoneNumbers'


const App = () => {

  // State hooks
  const [contacts, setContacts] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // Event handlers
  const handleFilterChange = (event) => { setNewFilter(event.target.value) }
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }

  // Effect hook for data loading
  const hook = () => { phoneNumberService.getAll().then(response => setContacts(response.data)) }
  useEffect(hook, [])

  // Function that is executed on form submission
  const addContact = (event) => {

    // Create new contact and send it to server
    event.preventDefault()
    const contactObject = { name: newName, number: newNumber }
    const sameName = contacts.filter(contact => contact.name === newName)
    if (sameName.length > 0) {
      const msg = `Contact ${newName} is already in the phonebook. Do you want to replace the old contact?`
      const confirm = window.confirm(msg)
      if (confirm) {
        phoneNumberService.update(sameName[0].id, contactObject).then(hook)
      }
    } else {
      phoneNumberService.create(contactObject).then(
        response => { setContacts(contacts.concat(response.data)) }
      )
    }

    // Clear form fields
    setNewName('')
    setNewNumber('')
  }

  // Function that is executed when a Delete button is clicked
  const deleteContact = (event) => {
    const button = event.target
    const confirm = window.confirm(`Delete ${button.name}?`);
    if (confirm) {
      phoneNumberService.destroy(button.id).then(hook)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>

      <h2>Add new</h2>
      <InputForm
        addObject={addContact} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}>
      </InputForm>

      <h2>Numbers</h2>
      <ContactList contacts={contacts} filter={newFilter} deleteFun={deleteContact}></ContactList>
    </div>
  )

}

export default App