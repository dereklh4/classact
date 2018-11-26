import React, {Component} from 'react';
import {SignOutButton} from './SignOut'
import {CA_STYLE_HOME, HOME_STYLE} from '../constants/styles'
import {TileGrid} from './TileGrid'
import {AddJoinForm} from './AddJoinForm'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            userInfo: '',
            error: null,
            courses: []
        };
    }

    componentWillMount() {
        const token = 'Token ' + localStorage.getItem('token')
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
            this.setState({userInfo: response});
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
    onPlusClick = () => {
        this.setState({
            formOpen: true,
        })
    }

    onPlusClickAway = () => {
        this.setState({
            formOpen: false,
        })
    }

    onRemoveCourse = (url) => {
        const {courses} = this.state;
        const isNotId = item => item.classroom.url !== url;
        const updatedCourses = courses.filter(isNotId);
        this.setState({courses: updatedCourses})

        const data = {
            url: url
        }
        const token = 'Token ' + localStorage.getItem('token')
        fetch('http://localhost:8000/api/classroom/leave/', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
        })
        .catch(error => this.setState({error: error}))
    }

    render() {
        const {userInfo, courses, formOpen} = this.state;
        const {classes} = this.props;
        return (
          <div>
                <div className={classes.homeIntro}>
                    <Paper className={classes.paperRoot} elevation={1}>
                        <Avatar className={classes.avatar}>
                            <img style={CA_STYLE_HOME} src={require('../images/ClassActLogo.png')} alt="CA Logo"/>
                        </Avatar>
                        <div className={classes.words}>
                            <Typography className={classes.chatroomText}> Chatroom </Typography>
                            <Typography className={classes.homeText}>Hub</Typography>
                        </div>
                    </Paper>
                </div>
            <Typography align="center" className={classes.ownerText}>Chatrooms belonging to {userInfo.first_name}</Typography>
            <Paper className={classes.gridPaper}>
                <AddJoinForm formOpen={formOpen} onPlusClickAway={this.onPlusClickAway} courses={courses}/>
                <TileGrid onPlusClick={this.onPlusClick} courses={courses} onRemoveCourse={this.onRemoveCourse}/>
                <SignOutButton onUserChange={this.props.onUserChange}/>
            </Paper>
          </div>
        )
    }
}

export default withStyles(HOME_STYLE)(HomePage);
