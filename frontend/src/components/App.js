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

import * as routes from '../constants/routes';

class App extends Component {
    constructor(props) {
        super(props);
        WebSocketInstance.connect()

        this.state = {
            loggedInUser: null,
        }
    }

    onUserChange = (key) => {
        this.setState({loggedInUser: key})
    }
    render() {
        return(
          <Router>
            <div>
              <Navigation loggedInUser={this.state.loggedInUser} />

              <hr/>

              <Route
                exact path={routes.LANDING}
                component={LandingPage}
              />
              <Route
                exact path={routes.SIGN_UP}
                render= {(props) => <SignUpPage {...props} onUserChange={this.onUserChange} />}
              />
              <Route
                exact path={routes.SIGN_IN}
                render= {(props) => <SignInPage {...props} onUserChange={this.onUserChange} />}
              />
              <Route
                exact path={routes.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route
                exact path={routes.HOME}
                component={HomePage}
              />
            </div>
          </Router>
        )
    }
}
export default App;
