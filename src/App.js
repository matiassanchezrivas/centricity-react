import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import css from './styles/main.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App;
