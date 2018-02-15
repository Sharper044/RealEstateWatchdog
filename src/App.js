import React, { Component } from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom'
import NewSearch from './components/NewSearch';
import EditSearch from './components/EditSearch';
import About from './components/About';
import Home from './components/Home';
import Loading from './components/Loading';
import ResultsList from './components/ResultsList';
import SearchList from './components/SearchList';
import './reset.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Switch>
            <Route component={ Home } exact path="/"/>
            <Route component={ About } path="/about"/>
            <Route component={ NewSearch } path="/new_search"/>
            <Route component={ EditSearch } path="/edit_search"/>
            <Route component={ SearchList } path="/saved_searches"/>
            <Route component={ Loading } path="/search"/>
            <Route component={ ResultsList } path="/results"/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
