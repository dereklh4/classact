import React, { Component } from 'react';

const INITIAL_STATE = {
  password1: '',
  password2: '',
  error: 'TODO: THIS WILL NOT WORK NOW',
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={event => this.setState({'passwordOne': event.target.value})}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState({'passwordTwo': event.target.value})}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error}</p> }
      </form>
    );
  }
}

export default PasswordChangeForm;
