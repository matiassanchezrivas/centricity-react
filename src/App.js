import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import main_css from './styles/main.scss'
import CloudfrontTemplates from './pages/CloudfrontTemplates';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cloudfrontTemplates" component={CloudfrontTemplates} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App;
