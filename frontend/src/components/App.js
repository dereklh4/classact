import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import WebSocketInstance from '../services/WebSocket'

import Navigation from './Navigation';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import * as routes from '../constants/routes';

class App extends Component {
    constructor(props) {
        super(props);
        WebSocketInstance.connect()
        alert("classAct testing: Connected to websocketat " + WebSocketInstance.socketRef.url);
    }
    render() {
        return(
          <Router>
            <div>
              <Navigation />

              <hr/>

              <Route
                exact path={routes.LANDING}
                component={LandingPage}
              />
              <Route
                exact path={routes.SIGN_UP}
                component={SignUpPage}
              />
              <Route
                exact path={routes.SIGN_IN}
                component={SignInPage}
              />
              <Route
                exact path={routes.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route
                exact path={routes.HOME}
                component={HomePage}
              />
              <Route
                exact path={routes.ACCOUNT}
                component={AccountPage}
              />
            </div>
          </Router>
        )
    }
}
export default App;
