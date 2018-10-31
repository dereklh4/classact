import React, { Component } from 'react';
import WebSocketInstance from '../services/WebSocket'
import queryString from 'query-string';

export default class Chatroom extends Component {
	constructor(props) {
    	super(props);
    	this.state = {}
    	this.state = { message: '', messages: []};
      var params = queryString.parse(this.props.location.search)
    	WebSocketInstance.connect(params.url)
    	WebSocketInstance.addCallbacks(this.newMessage.bind(this),this.errorMessage.bind(this))
    };

    newMessage(message) {
    	this.setState({ messages: [...this.state.messages, message]});
  	}

  	errorMessage(error) {
  		alert("ERROR: " + error)
  	}

    messageChangeHandler = (event) =>  {
    	this.setState({
      		message: event.target.value
    	})
  	}

  	postChatMessageHandler = (e, text) => {
	    WebSocketInstance.postChatMessage(text);
    	this.setState({
      		message: ''
    	})
	    e.preventDefault();
  	}

  	renderMessages = (messages) => {
    	return messages.map((message, i) => <li key={message.id}> <p>{message.id}. { message.user } at {message.hour}:{message.minute}:{message.second} - "{ message.text }"</p></li>);
  	}

  render() {
    const messages = this.state.messages;
    return (
      <div className='chat'>
        <div className='container'>
          <ul ref={(el) => { this.messagesEnd = el; }}>
           { 
              messages && 
              this.renderMessages(messages) 
           }
          </ul>
        </div>
        <div className='container message-form'>
          <form onSubmit={(e) => this.postChatMessageHandler(e, this.state.message)} className='form'>
            <input
              type='text'
              onChange={this.messageChangeHandler}
              value={this.state.message}
              placeholder='Type a Message'
              required />
            <button className='submit' type='submit' value='Submit'>
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }

}