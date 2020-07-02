import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  const n = props.good + props.neutral + props.bad
  const av = (props.good - props.bad) / n
  const pos = props.good / n
  let stats = (
    <div>
      <table>
        <tbody>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={n} />
      <StatisticLine text="average" value={av} />
      <StatisticLine text="positive" value={100.0 * pos + "%"} />
      </tbody>
      </table>
    </div>

  )
  if(n === 0){
    stats = (
      <div>No feedback given.</div>
    )
  }

  return (stats)
}

const Button = (props) => {
  return(
      <button onClick={props.clickFun}> {props.name} </button>
  )
  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name='Good' clickFun={handleGoodClick}></Button>
      <Button name='Neutral' clickFun={handleNeutralClick}></Button>
      <Button name='Bad' clickFun={handleBadClick}></Button>

      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}> Stats </Statistics>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)