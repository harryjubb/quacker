import * as React from 'react'
import * as ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'

function render() {
  ReactDOM.render(<App />, document.getElementById('app'))
}

render()