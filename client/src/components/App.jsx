import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import Login from './Login.jsx'
import Home from './Home.jsx'

export default class App extends React.Component {

  componentDidMount() {
    this.test()
  }

  test = () => {
    fetch('/api/heartbeat', {
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={() => <Redirect to="/home" />} /> 
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    )
  }

}
