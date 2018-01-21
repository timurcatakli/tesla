import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
const propTypes = {}

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/trivia' component={Trivia}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    )
  }
}
App.propTypes = propTypes
export default App
