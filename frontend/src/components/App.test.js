import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Upvotes from './Upvotes';
import Edit from './Edit';
import {EditButton} from './EditButton';
import {DeleteButton} from './DeleteButton';
import {EditField} from './EditField';
import {BackButton} from './BackButton';
import PasswordChange from './PasswordChange';
import {Tile} from './Tile';
import Landing from './Landing';
import SignIn from './SignIn';
import {SignOutButton} from './SignOut';
import SignUp from './SignUp';
import HomePage from './Home';
import PasswordForgetPage from './PasswordForget';
import {AddJoinForm} from './AddJoinForm';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Upvotes', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Upvotes upvotedByUser="true"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Edit', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Edit classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('EditButton', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditButton classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('EditField', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditField classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('DeleteButton', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteButton classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('BackButton', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BackButton classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('PasswordChange', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PasswordChange classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Tile', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Tile classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Landing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Landing classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('SignIn', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SignIn classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('SignUp', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SignUp classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('SignOut', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><SignOutButton classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Home', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><HomePage classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('PasswordForget', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><PasswordForgetPage classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('AddJoinForm', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddJoinForm classes=""/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
