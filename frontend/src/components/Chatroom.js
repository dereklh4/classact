import React, { Component } from 'react';
import WebSocketInstance from '../services/WebSocket'
import {withRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import queryString from 'query-string';
import {QuestionList} from './QuestionList';
import {QUESTION_STYLE, CA_STYLE_CHATROOM} from '../constants/styles';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

class Chatroom extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
			message: '',
			messages: [],
			chatName: '',
			searchVal: '',
			searchValPinned: '',
			courses: [],
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
    									this.resolvedMessage.bind(this),
    									this.endorsedResponse.bind(this))

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
		fetch('http://localhost:8000/api/auth/user/', {
			method: 'GET',
			headers: {
				'Authorization': token,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		})
		.then(response => response.json())
		.then(response => {
			this.getCourses(response.email);
		})
		.catch(error => this.setState({error: error}))
	}

	getCourses = (email) => {
		const token = 'Token ' + localStorage.getItem('token')
		const url = 'http://localhost:8000/api/user/' + email + '/'
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
			this.setState({courses: response})
		})
		.catch(error => this.setState({error: error}))
	}

	changeCourse = (course) => {
		WebSocketInstance.close();
		WebSocketInstance.connect(course.classroom.url)
		this.setState({chatName: course.classroom.title})
		this.props.history.push(routes.CHATROOM + "?url=" + course.classroom.url, {url: course.classroom.url, permission: course.classroom.permission})

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
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {saved_by_user: content.saved})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
	}

	unSavedMessage(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {saved_by_user: content.saved})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
	}

	resolvedMessage(content) {
		const messages = this.state.messages;
		const index = messages.findIndex((message) => message.id === content.message_id);
		const updatedMessages = [...this.state.messages]
		const newMessage = Object.assign(updatedMessages[index], {resolved: content.resolved})
		updatedMessages[index] = newMessage
		this.setState({messages: updatedMessages})
	}

	endorsedResponse(content) {
		console.log("Endorsed response:")
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
	filterFor = (value, isPinnedList) => {
		if (isPinnedList) {
			this.setState({searchValPinned: value});
		}
		else {
			this.setState({searchVal: value});
		}
	}
  render() {
    const {messages, courses} = this.state;
	const updatedCourses = courses.filter(c => c.classroom.url !== this.props.location.state.url)
	const {classes} = this.props;
    return (
		<React.Fragment>
			<CssBaseline/>
			<div className={classes.chatIntro}>
				<Paper className={classes.paperRoot} elevation={1}>
					<Avatar className={classes.avatar}>
						<img style={CA_STYLE_CHATROOM} src={require('../images/ClassActLogo.png')} alt="CA Logo"/>
					</Avatar>
					<Typography component="h1" variant="h5" className={classes.chatName}>
						{this.state.chatName}
					</Typography>
				</Paper>
			</div>

			<main className={classes.layout}>
				<div className={classes.settingsAndRooms}>
					<Typography component="h1" variant="h5" className={classes.settingsText}>
						Settings
					</Typography>
					<Button
						type="button"
						onClick={this.handleHomeClick}
						className={classes.submit1}
						fullWidth
					>
						Back To Home
					</Button>
					<div className={classes.otherRooms}>
						<List
							component="nav"
        					subheader={<ListSubheader component="div">Other Chatrooms</ListSubheader>}
        					className={classes.listRoot}
						>
							{updatedCourses.map(course =>
								<ListItem key={course.classroom.url} button onClick={() => this.changeCourse(course)} className={classes.listItem}>
									<ListItemText primary={course.classroom.title}/>
								</ListItem>
							)}
						</List>
					</div>
				</div>
				<div className={classes.chatBoxes}>
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h5">
							Ongoing Questions
						</Typography>
						<TextField
							label="Search Questions"
							value={this.state.searchVal}
							onChange={(event) => this.filterFor(event.target.value, false)}
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
							pinned={false}
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
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h5">
							Moderator Pinned Questions
						</Typography>
						<TextField
							label="Search Pinned Questions"
							value={this.state.searchValPinned}
							onChange={(event) => this.filterFor(event.target.value, true)}
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
							 <IconButton onClick={() => this.setState({searchValPinned: ''})} className={classes.deleteSearch}>
								 <Close fontSize="default" color="black"/>
							 </IconButton>
						 </TextField>
						<QuestionList
							questions={messages}
							searchVal={this.state.searchValPinned}
							permission={this.props.location.state.permission}
							pinned={true}
						/>
					</Paper>
				</div>
			</main>
		</React.Fragment>
    );
  }
}

export default withRouter(withStyles(QUESTION_STYLE)(Chatroom));
