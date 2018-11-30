import React, { Component } from 'react';
import WebSocketInstance from '../services/WebSocket'
import {withRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import queryString from 'query-string';
import {QuestionList} from './QuestionList';
import {QUESTION_STYLE, CA_STYLE_HOME} from '../constants/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';

class Chatroom extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			message: '',
			messages: [],
			chatName: '',
			searchVal: '',
		};

      var params = queryString.parse(this.props.location.search)
    	WebSocketInstance.connect(params.url)
    	WebSocketInstance.addCallbacks(this.initChat.bind(this),
    									this.errorMessage.bind(this),
    									this.newMessage.bind(this),
    									this.upvotedMessage.bind(this),
										this.unUpvotedMessage.bind(this),
    									this.newResponse.bind(this),
    									this.editResponse.bind(this),
    									this.deleteResponse.bind(this),
    									this.editMessage.bind(this),
    									this.deleteMessage.bind(this),
    									this.upvotedResponse.bind(this),
    									this.unUpvotedResponse.bind(this),
    									this.pinnedMessage.bind(this),
    									this.savedMessage.bind(this),
    									this.unSavedMessage.bind(this),
    									this.resolvedMessage.bind(this))

    };

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

  	upvotedMessage(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {upvotes: content.upvotes, upvoted_by_user: true})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
  	}

	unUpvotedMessage(content) {
		const message = this.state.messages;
		const index = message.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {upvotes: content.upvotes, upvoted_by_user: false})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
	}

	upvotedResponse(content) {
		const messages = this.state.messages;
		const messageIndex = messages.findIndex((message) => message.id === content.message_id)
		const updatedMessages = [...this.state.messages]
		const responses = updatedMessages[messageIndex].responses
		const responseIndex = responses.findIndex((r) => r.response_id === content.response_id)
		const newResponse = Object.assign(updatedMessages[messageIndex].responses[responseIndex], {upvotes: content.upvotes, upvoted_by_user: true})
		responses[responseIndex] = newResponse
		const newMessage = Object.assign(updatedMessages[messageIndex], {responses: responses})
		updatedMessages[messageIndex] = newMessage
		this.setState({messages: updatedMessages})
  	}

	unUpvotedResponse(content) {
		const messages = this.state.messages;
		const messageIndex = messages.findIndex((message) => message.id === content.message_id)
		const updatedMessages = [...this.state.messages]
		const responses = updatedMessages[messageIndex].responses
		const responseIndex = responses.findIndex((r) => r.response_id === content.response_id)
		const newResponse = Object.assign(updatedMessages[messageIndex].responses[responseIndex], {upvotes: content.upvotes, upvoted_by_user: false})
		responses[responseIndex] = newResponse
		const newMessage = Object.assign(updatedMessages[messageIndex], {responses: responses})
		updatedMessages[messageIndex] = newMessage
		this.setState(this.state)
	}

  	newResponse(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const updatedResponses = updatedMessages[index].responses
		updatedResponses.push(content)
		const newMessage = Object.assign(updatedMessages[index], {responses: updatedResponses})
  		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages })
  	}

  	deleteResponse(content) {
  		const messages = this.state.messages;
		const messageIndex = messages.findIndex((message) => message.id === content.message_id)
		const updatedMessages = [...this.state.messages]
		const responses = updatedMessages[messageIndex].responses
		const responseIndex = responses.findIndex((r) => r.response_id === content.response_id)
		responses.splice(responseIndex, 1)
		const newMessage = Object.assign(updatedMessages[messageIndex], {responses: responses})
		updatedMessages[messageIndex] = newMessage
		this.setState({messages: updatedMessages})
  	}

  	editResponse(content) {
		const messages = this.state.messages;
		const messageIndex = messages.findIndex((message) => message.id === content.message_id)
		const updatedMessages = [...this.state.messages]
		const responses = updatedMessages[messageIndex].responses
		const responseIndex = responses.findIndex((r) => r.response_id === content.response_id)
		const newResponse = Object.assign(updatedMessages[messageIndex].responses[responseIndex], {text: content.text})
		responses[responseIndex] = newResponse
		const newMessage = Object.assign(updatedMessages[messageIndex], {responses: responses})
		updatedMessages[messageIndex] = newMessage
		this.setState({messages: updatedMessages})


  	}

  	editMessage(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {text: content.text})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
	}

	deleteMessage(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		updatedMessages.splice(index, 1);
		this.setState({messages: updatedMessages})
	}

	pinnedMessage(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {pinned: content.pinned})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
	}

	savedMessage(content) {
		console.log("Saved message:")
		console.log(content)
	}

	unSavedMessage(content) {
		console.log("Unsaved message:")
		console.log(content)
	}

	resolvedMessage(content) {
		console.log("Resolved message:")
		console.log(content)
	}

  	postChatMessageHandler = (e, text) => {
		this.setState({searchVal: ''})
	    WebSocketInstance.postChatMessage(text);
    	this.setState({
      		message: ''
    	})
	    e.preventDefault();
  	}

	handleHomeClick = () => {
		WebSocketInstance.close();
		this.props.history.push(routes.HOME)
	}
	filterFor = (value) => {
		this.setState({searchVal: value});
	}
  render() {
    const messages = this.state.messages;
	const {classes} = this.props;
    return (
		<React.Fragment>
			<CssBaseline/>
			<div className={classes.chatIntro}>
				<Paper className={classes.paperRoot} elevation={1}>
					<Avatar className={classes.avatar}>
						<img style={CA_STYLE_HOME} src={require('../images/ClassActLogo.png')} alt="CA Logo"/>
					</Avatar>
				</Paper>
			</div>
			<Button
				type="button"
				onClick={this.handleHomeClick}
				className={classes.submit1}
			>
				Back To Home
			</Button>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						{this.state.chatName}
					</Typography>
					<TextField
	 					label="Search Questions"
				  		value={this.state.searchVal}
			  			onChange={(event) => this.filterFor(event.target.value)}
			  			margin="dense"
			  			variant="outlined"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton aria-label="Toggle password visibility" onClick={() => this.setState({searchVal: ''})}>
										<Close/>
									</IconButton>
								</InputAdornment>
							)
						}}
					>
						 <IconButton onClick={() => this.setState({searchVal: ''})} className={classes.deleteSearch}>
							 <Close fontSize="default" color="black"/>
						 </IconButton>
					 </TextField>
					<QuestionList
						questions={messages}
						searchVal={this.state.searchVal}
						permission={this.props.location.state.permission}
					/>
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
