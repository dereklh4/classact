import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import ChatRoom from './Chatroom';
import Account from './Account'
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import * as routes from '../constants/routes';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInUser: null,
        }
    }
    componentDidMount() {
        const userKey = localStorage.getItem('token');
        this.setState({loggedInUser: userKey});
    }
    onUserChange = (key) => {
        this.setState({loggedInUser: key})
    }
    render() {
        const {loggedInUser} = this.state;
        return(
          <Router>
              <MuiThemeProvider theme={theme}>
                <div>

                  <Route
                    exact path={routes.LANDING}
                    render={() => (
                        (loggedInUser !== null) ? (
                            <Redirect to={routes.HOME}/>
                        ) :
                        (
                            <LandingPage/>
                        )
                    )}
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
                    render={(props) => (
                        (loggedInUser !== null) ? (
                            <HomePage {...props} onUserChange={this.onUserChange}/>
                        ) :
                        (
                            <Redirect to={routes.LANDING}/>
                        )
                    )}

                  />
                  <Route
                    exact path={routes.ACCOUNT}
                    component={Account}
                  />

                  <Route
                    exact path={routes.CHATROOM}
                    component={ChatRoom}
                  />
                </div>
            </MuiThemeProvider>
          </Router>
        )
    }
}
export default App;
