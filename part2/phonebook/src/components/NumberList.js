import React from 'react'


const Person = (props) => {
    return(
      <div>
        {props.name}: {props.number}
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

export default NumberList
