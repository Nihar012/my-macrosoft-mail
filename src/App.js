import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const App = props => {

  useEffect(() => {
    props.autoLogin()

  }, [])

  return (
    <div className="App">

      {props.isAuth ?
        <Switch>
          <Route path='/dashboard' >
            <Dashboard />
          </Route>
          <Redirect from='/' to='/dashboard' />
        </Switch> :
        <Route path='/' >
          <Login />
        </Route>}
        
    </div>
  );
}


const mapStateToProps = state => {
  return {
    isAuth: state.auth.token ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.onAutoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);