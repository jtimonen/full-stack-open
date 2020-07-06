import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import CountryList from './CountryList'


function App() {

  // State hook
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const endpoint = 'https://restcountries.eu/rest/v2/all'

  // Effect hook
  const hook = () => {
    axios.get(endpoint).then((response) => {
      setCountries(response.data)
    })
  }
  useEffect(hook, [])


  // Event handler for search
  const handleInputChange = (event) => {
    const input = event.target.value
    setNewFilter(input)
  }

  // Event handler for buttons
  const handleClick = (event) => {
    //console.log('Clicked', event.target.value)
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h1>Countries</h1>
      <div>
        <Filter info='Find Country' value={newFilter} onChange={handleInputChange}></Filter>
      </div>
      <br></br>
      <div>
        <CountryList countries={countries} filter={newFilter} handleClick={handleClick}></CountryList>
      </div>
    </div>
  );
}

export default App;
