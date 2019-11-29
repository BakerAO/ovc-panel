import React from 'react'
import ReactDOM from 'react-dom'
import Panel from './components/Panel'
import './styles/Main.css'

const App = () => {
  return (
    <div>
      <Panel />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
