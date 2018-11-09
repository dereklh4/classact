import React, { Component } from 'react';
import WebSocketInstance from '../services/WebSocket'
import update from 'immutability-helper'
import {withRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import queryString from 'query-string';
import {QuestionList} from './QuestionList';
//TODO: Add appropriate styling for chatroom component
import {QUESTION_STYLE} from '../constants/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

class Chatroom extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			message: '',
			messages: [],
			chatName: '',
		};

      var params = queryString.parse(this.props.location.search)
    	WebSocketInstance.connect(params.url)
    	WebSocketInstance.addCallbacks(this.initChat.bind(this),
    									this.errorMessage.bind(this),
    									this.newMessage.bind(this),
    									this.upvotedMessage.bind(this))
    };

	// TODO: Fetch other information about particlular chatroom
	componentDidMount() {
		const token = 'Token ' + localStorage.getItem('token')
		const addedUrl = this.props.location.state.url;
		const url = 'http://localhost:8000/api/classroom/' + addedUrl + '/'
		fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': token,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		})
		.then(response => response.json())
		.then(response => {
			this.setState({chatName: response[0].title});
		})
		.catch(error => this.setState({error: error}))
	}

	initChat(inMessages) {
		this.setState({messages: inMessages})
	}

    newMessage(message) {
    	this.setState({ messages: [...this.state.messages, message]});
  	}

  	errorMessage(error) {
  		alert("ERROR: " + error)
  	}

  	//TODO: Update upvoted message upvote count
  	upvotedMessage(content) {
		console.log(content.message_id)
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		console.log(index)
		const updatedMessages = [...this.state.messages]
		console.log(updatedMessages[index])
		updatedMessages[index].upvotes = content.upvotes
		this.setState({messages: updatedMessages})
  		//format is {message_id: 7, upvotes: 1}
  		console.log(content)
  	}

  	postChatMessageHandler = (e, text) => {
	    WebSocketInstance.postChatMessage(text);
    	this.setState({
      		message: ''
    	})
	    e.preventDefault();
  	}

	upvoteThisMessage = (id) => {
		WebSocketInstance.upvoteMessage(id);
	}
  render() {
    const messages = this.state.messages;
	const {classes, history} = this.props;
    return (
		<React.Fragment>
			<CssBaseline/>
			<Button
				type="button"
				onClick={() => history.push(routes.HOME)}
				className={classes.submit}
			>
				Back To Home
			</Button>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						{this.state.chatName}
					</Typography>
					<QuestionList questions={messages} upvoteThisMessage={this.upvoteThisMessage}/>
					<form onSubmit={(e) => this.postChatMessageHandler(e, this.state.message)} className={classes.postQuestion}>
						<FormControl margin="normal" fullWidth required>
							<TextField
								label="Enter Question"
								multiline
								rows="3"
								value={this.state.message}
								onChange={event => this.setState({message: event.target.value})}
								type="text"
								placeholder="Enter Question Here"
								autoFocus
								fullWidth
								variant="outlined"
							/>
							<Button
								disabled={this.state.message === ''}
								type="submit"
								fullWidth className={classes.submit}
								variant="contained"
							>
								Post New Question
							</Button>
						</FormControl>
					</form>
				</Paper>
			</main>
		</React.Fragment>
    );
  }
}

export default withRouter(withStyles(QUESTION_STYLE)(Chatroom));
