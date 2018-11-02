import React, { Component } from 'react';
import WebSocketInstance from '../services/WebSocket'
import queryString from 'query-string';
import {QuestionList} from './QuestionList';
//TODO: Add appropriate styling for chatroom component
import {INTRO_STYLE} from '../constants/styles';
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
    	WebSocketInstance.addCallbacks(this.newMessage.bind(this),this.errorMessage.bind(this))
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
    newMessage(message) {
    	this.setState({ messages: [...this.state.messages, message]});
  	}

  	errorMessage(error) {
  		alert("ERROR: " + error)
  	}


  	postChatMessageHandler = (e, text) => {
	    WebSocketInstance.postChatMessage(text);
    	this.setState({
      		message: ''
    	})
	    e.preventDefault();
  	}

  render() {
    const messages = this.state.messages;
	const {classes} = this.props;
    return (
		<React.Fragment>
			<CssBaseline/>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h5">
						{this.state.chatName}
					</Typography>
					<QuestionList questions={messages} classes={classes}/>
					<form onSubmit={(e) => this.postChatMessageHandler(e, this.state.message)} className={classes.questionForm}>
						<FormControl margin="normal" required>
							<TextField
								value={this.state.message}
								onChange={event => this.setState({message: event.target.value})}
								type="text"
								placeholder="Enter Question Here"
								autoFocus
								multiline
								fullWidth
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

export default withStyles(INTRO_STYLE)(Chatroom);
