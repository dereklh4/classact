import React, {Component} from 'react';
import {SignOutButton} from './SignOut'
import { CARD_STYLE} from '../constants/styles'
import {TileGrid} from './TileGrid'
import {AddJoinForm} from './AddJoinForm'
import withStyles from '@material-ui/core/styles/withStyles';


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
        return (
          <div>
            <h1>Home</h1>
            <h2>Classrooms belonging to {userInfo.first_name}</h2>
            <AddJoinForm formOpen={formOpen} onPlusClickAway={this.onPlusClickAway} courses={courses}/>
            <TileGrid onPlusClick={this.onPlusClick} courses={courses} onRemoveCourse={this.onRemoveCourse}/>
            <SignOutButton onUserChange={this.props.onUserChange}/>
          </div>
        )
    }
}

export default withStyles(CARD_STYLE)(HomePage);
