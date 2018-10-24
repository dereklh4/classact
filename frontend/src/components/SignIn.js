import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PasswordForgetLink } from './PasswordForget';
import { SignUpLink } from './SignUp';
import * as routes from '../constants/routes';

const SignInPage = ({ history, onUserChange }) =>
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} onUserChange={onUserChange} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SIGN_IN_ERROR = 'Sorry, your email or password does not match our records.' +
    ' Please try again.'

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const data = {
        email,
        password,
    };

    const {
      history,
    } = this.props;

    fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
          if (response.key === undefined) {
              throw Error(response);
          }
          localStorage.setItem('token', response.key);
          this.props.onUserChange(response.key);
          history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({error: SIGN_IN_ERROR});
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState({email: event.target.value})}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState({password: event.target.value})}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
