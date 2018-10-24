import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';

const SignUpPage = ({history, onUserChange}) =>
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} onUserChange={onUserChange}/>
  </div>

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
    return (
      <form onSubmit={this.onSubmit}>
          <input
            value={first_name}
            onChange={event => this.setState({first_name: event.target.value})}
            type="text"
            placeholder="First Name"
          />
          <input
            value={last_name}
            onChange={event => this.setState({last_name: event.target.value})}
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
            value={password1}
            onChange={event => this.setState({password1: event.target.value})}
            type="password"
            placeholder="Password"
          />
          <input
            value={password2}
            onChange={event => this.setState({password2: event.target.value})}
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

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
