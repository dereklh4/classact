import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Upvotes from './Upvotes'
import Edit from './Edit'

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

it('Upvotes', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Edit classes=""/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
