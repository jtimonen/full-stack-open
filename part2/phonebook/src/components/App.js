import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NumberList from './NumberList'
import Filter from './Filter'
import InputForm from './InputForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    // Check if <persons> already contains newName
    let alreadyAdded = false
    persons.forEach(function (person) {
      if (person.name === newName) {
        alreadyAdded = true
      }
    })

    if (alreadyAdded) {
      window.alert(`${newName} is already in the phonebook!`);
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const effectHandler = (response) => {
    //console.log('promise fulfilled')
    setPersons(response.data)
  }

  const hook = () => {
    //console.log('effect')
    var promise = axios.get('http://localhost:3003/persons')
    promise.then(effectHandler)
  }

  // Effect hook for data loading
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>

      <h2>Add new</h2>
      <InputForm
        addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}>
      </InputForm>

      <h2>Numbers</h2>
      <NumberList persons={persons} filter={newFilter}></NumberList>
    </div>
  )

}

export default App