import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import main_css from './styles/main.scss'
import CloudformationTemplates from './pages/CloudformationTemplates';
import Configurations from './pages/Configurations';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cloudformationTemplates" component={CloudformationTemplates} />
            <Route exact path="/configurations" component={Configurations} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App;
