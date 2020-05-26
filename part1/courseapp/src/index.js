import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part= (props) => {
  return (
    <div>
      <p> {props.p}: {props.e} </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises: {props.total}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part e={props.e1} p={props.p1}/>
      <Part e={props.e2} p={props.p2}/>
      <Part e={props.e3} p={props.p3}/>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const p1 = 'Fundamentals of React'
  const e1 = 10
  const p2 = 'Using props to pass data'
  const e2 = 7
  const p3 = 'State of a component'
  const e3 = 14

  return (
    <div>
      <Header course={course} />
      <Content p1={p1} p2={p2} p3={p3} e1={e1} e2={e2} e3={e3}/>
      <Total total={e1+e2+e3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
