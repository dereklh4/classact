import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {SignInLink} from './SignIn';
import * as routes from '../constants/routes';
import {CA_STYLE, INTRO_STYLE} from '../constants/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const SignUpPage = ({history, onUserChange, classes}) =>
    <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img
                        style={CA_STYLE}
                        src={require('../images/ClassActLogo.png')}
                        alt="CA Logo"
                    />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <SignUpForm
                    history={history}
                    onUserChange={onUserChange}
                    classes={classes}
                />
                <SignInLink/>
            </Paper>
        </main>
    </React.Fragment>

const INITIAL_STATE = {
    first_name: '',
    last_name: '',
    email: '',
    password1: '',
    password2: '',
    error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
        first_name,
        last_name,
        email,
        password1,
        password2
    } = this.state;

    const data = {
        email,
        password1,
        password2,
        first_name,
        last_name
    };

    const {history} = this.props;
      event.preventDefault();
      fetch('http://localhost:8000/api/auth/registration/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then (response => response.json())
      .then(response => {
          if (response.key === undefined) {
              throw Error(response.email[0]);
          }
          localStorage.setItem('token', response.key);
          this.props.onUserChange(response.key);
          history.push(routes.HOME);
      })
      .catch(error => {
          this.setState({error: error})
      });
  }

  render() {
      const {
          first_name,
          last_name,
          email,
          password1,
          password2,
          error,
      } = this.state;

      const isInvalid =
        password1 !== password2 ||
        password1 === '' ||
        email === '' ||
        first_name === '' ||
        last_name === '';

        const {classes} = this.props;
    return (
      <form onSubmit={this.onSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="first_name">First Name</InputLabel>
              <Input
                value={first_name}
                onChange={event => this.setState({first_name: event.target.value})}
                type="text"
                placeholder="First Name"
              />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="last_name">Last Name</InputLabel>
              <Input
                value={last_name}
                onChange={event => this.setState({last_name: event.target.value})}
                type="text"
                placeholder="Last Name"
              />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                value={email}
                onChange={event => this.setState({email: event.target.value})}
                type="text"
                placeholder="Email Address"
              />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password1">Password</InputLabel>
              <Input
                value={password1}
                onChange={event => this.setState({password1: event.target.value})}
                type="password"
                placeholder="Password"
              />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Re-enter Password</InputLabel>
              <Input
                value={password2}
                onChange={event => this.setState({password2: event.target.value})}
                type="password"
                placeholder="Confirm Password"
                error={password1 !== '' && password2 !== '' && password1 !== password2}
              />
          </FormControl>
          <Button
              disabled={isInvalid}
              type="submit"
              fullWidth
              className={classes.submit}
              variant="contained"
          >
              Sign Up
          </Button>

          <Typography color="error" align="center">
              {error && <p>{error.message}</p>}
          </Typography>
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(withStyles(INTRO_STYLE)(SignUpPage));

export {
  SignUpForm,
  SignUpLink,
};
