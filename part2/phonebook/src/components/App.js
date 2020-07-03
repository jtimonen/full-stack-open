import React, { useState } from 'react'

const Person = (props) => {
    return(
      <div>
        {props.name}: {props.number}
      </div>
    )
}

const Filter = (props) => {
  return(
     <div> 
       Filter for shown names: <input value={props.value} onChange={props.onChange}/> 
    </div>
  )
}

const NumberList = (props) => {

  const personsToShow = props.persons.filter(
    person => person.name.toLowerCase().includes(props.filter.toLowerCase())
  )

  const mapper = (person) => {
    return(
      <Person key={person.id} name={person.name} number={person.number}></Person>
    )
  }

  return(
    <div> {personsToShow.map(mapper)} </div>
  )
}

const InputForm = (props) => {
  return(
    <form onSubmit={props.addName}>
    <div> Name: <input value={props.newName} onChange={props.handleNameChange}/> </div>
    <div> Number: <input value={props.newNumber} onChange={props.handleNumberChange}/> </div>
    <div> <button type="submit">Add</button> </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')

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
    persons.forEach(function(person) {
      if(person.name === newName){
        alreadyAdded = true
      }
    })

    if(alreadyAdded){
      window.alert(`${newName} is already in the phonebook!`);
    }else{
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }


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