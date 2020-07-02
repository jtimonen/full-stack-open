import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
      <button onClick={props.clickFun}> {props.name} </button>    
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const clickVote = () => {
    const copy_votes = [...votes]
    copy_votes[selected] += 1
    setVotes(copy_votes)
  }

  const clickNext = () => {
    const idx = Math.floor(Math.random() * 6)
    //console.log('Random number was ' + idx)
    setSelected(idx)
  }

  const best = votes.indexOf(Math.max(...votes))
  //console.log(best)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes = {votes[selected]}</p>
      <Button name='Vote' clickFun={clickVote}></Button>
      <Button name='Next anecdote' clickFun={clickNext}></Button>

      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[best]}</p>
      <p>Votes = {votes[best]}</p>

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)