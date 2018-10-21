import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {SignUp} from '../functions/SignUpFunc.js'

import * as routes from '../constants/routes';

const SignUpPage = () =>
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = (event) => {
    const {
        firstName,
        lastName,
        email,
        passwordOne,
        passwordTwo
    } = this.state;

    const data = {
        firstName,
        lastName,
        email,
        passwordOne,
        passwordTwo
    };
      SignUp(data);
      event.preventDefault();
  }

  render() {
      const {
          firstName,
          lastName,
          email,
          passwordOne,
          passwordTwo,
          error,
      } = this.state;

      const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        firstName === '' ||
        lastName === '';
    return (
      <form onSubmit={this.onSubmit}>
          <input
            value={firstName}
            onChange={event => this.setState({firstName: event.target.value})}
            type="text"
            placeholder="First Name"
          />
          <input
            value={lastName}
            onChange={event => this.setState({lastName: event.target.value})}
            type="text"
            placeholder="Last Name"
          />
          <input
            value={email}
            onChange={event => this.setState({email: event.target.value})}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={event => this.setState({passwordOne: event.target.value})}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState({passwordTwo: event.target.value})}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          { error && <p>{error.message}</p> }
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

export default SignUpPage;

export {
  SignUpForm,
  SignUpLink,
};
