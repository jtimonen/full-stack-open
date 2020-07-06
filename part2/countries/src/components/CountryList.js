import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ListedCountry = (props) => {
    return (
        <div>
            {props.name} <button onClick={props.handleClick} value={props.name}>show more</button>
        </div>
    )
}

const CountryInformation = (props) => {

    const languageList = props.country.languages.map(lang => <li key={lang.iso639_2}> {lang.name} ({lang.iso639_2}) </li>)
    const cn = props.country.name
    const imgURL = props.country.flag
    const altString = `The ${props.country.demonym} flag.`

    const api_key = process.env.REACT_APP_API_KEY
    const weatherURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital.toLowerCase()}`
    const [weather, setWeather] = useState({})


    // Effect hook
    const hook = () => {
        axios.get(weatherURL).then((response) => {
            const temp = response.data.current.temperature
            const wind = response.data.current.wind_speed
            const precip = response.data.current.precip
            const weatherObject = { temperature: temp, wind_speed: wind, precip: precip}
            setWeather(weatherObject)
        })
    }
    useEffect(hook, [])

    return (
        <div>
            <h2>{cn}</h2>
            <div>
                <table>
                    <tbody>
                        <tr><td>Capital: </td><td>{props.country.capital}</td></tr>
                        <tr><td>Population: </td><td>{props.country.population}</td></tr>
                        <tr><td>Area: </td><td>{props.country.area}</td></tr>
                    </tbody>
                </table>

                <h3>Languages</h3>
                <ul>
                    {languageList}
                </ul>

                <div>
                    <img src={imgURL} alt={altString} width='300' border='1' />
                </div>

                <h3>Weather in {props.country.capital}</h3>
                <table>
                    <tbody>
                        <tr><td>Temperature: </td><td>{weather.temperature} C</td></tr>
                        <tr><td>Wind speed: </td><td>{weather.wind_speed} mph</td></tr>
                        <tr><td>Precipication: </td><td>{weather.precip} mm</td></tr>
                    </tbody>
                </table>


            </div>
        </div>
    )
}


const CountryList = (props) => {

    const filter = props.filter.toLowerCase()
    const countriesToShow = props.countries.filter(
        country => country.name.toLowerCase().includes(filter)
    )



    const mapper = (country) => {
        return (
            <ListedCountry key={country.numericCode} name={country.name} handleClick={props.handleClick}></ListedCountry>
        )
    }

    let out = ' '
    if (countriesToShow.length > 10) {
        out = <div>Too many matches ({countriesToShow.length}), specify another filter.</div>
    } else if (countriesToShow.length > 1) {
        out = <div> {countriesToShow.map(mapper)} </div>
    } else if (countriesToShow.length < 1) {
        out = <div>No matches for '{filter}'.</div>
    } else {
        out = <CountryInformation country={countriesToShow[0]}></CountryInformation>
    }
    return (out)

}

export default CountryList