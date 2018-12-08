import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as routes from '../constants/routes';
import {FORM_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddJoinFormBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currTab: 0,
        };
    }

    changeTab = (event, value) => {
        this.setState({currTab: value})
    }

    render() {
        const {formOpen, onPlusClickAway, classes, history, courses} = this.props;
        return (
            <div>
               <Dialog
                 open={formOpen}
                 onClose={onPlusClickAway}
               >
                 <DialogTitle className={classes.formTitle}>Add or Create a Chatroom</DialogTitle>
                 <DialogContent>
                   <DialogContentText>
                     Please choose whether you wish to join a classroom or create a new one
                   </DialogContentText>
                   <Paper >
                      <Tabs
                        value={this.state.currTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.changeTab}
                        centered
                      >
                        <Tab label="Join" />
                        <Tab label="Create" />
                      </Tabs>
                    </Paper>

                    {this.state.currTab === 0 ?
                        <JoinClassForm classes={classes} history={history} courses={courses}/>
                        :
                        <AddClassForm classes={classes} history={history}/>
                    }
                 </DialogContent>
               </Dialog>
             </div>
        );
    }
}
const ERROR_JOIN_MESSAGE = 'Something went wrong, please ensure you have the correct ClassID and are logged in'
class JoinClassForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classID: '',
            error: null,
        };
    }

    onSubmit = (event) => {
       const {classID} = this.state;
       const {history, courses} = this.props;
       const index = courses.findIndex((course) => course.classroom.url === classID)
       if (index >= 0) {
           history.push(routes.CHATROOM + "?url=" + classID, {url: classID, permission: courses[index].permission});
           return;
       }
       const data = {
           url: classID
       };
       const token = 'Token ' + localStorage.getItem('token')
       fetch('http://localhost:8000/api/classroom/join/', {
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
           if (response.status !== undefined && response.status === "SUCCESS") {
               history.push(routes.CHATROOM + "?url=" + response.url, {url: response.url, permission: 1});
            }
           else {
               throw Error(ERROR_JOIN_MESSAGE)
           }
       })
       .catch(error => this.setState({error: error}))
       event.preventDefault();
   }
    render() {
        const {classes} = this.props;
        const {error} = this.state;
        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel>Class ID</InputLabel>
                    <Input
                      value={this.state.classID}
                      onChange={event => this.setState({classID: event.target.value})}
                      type="text"
                      placeholder="Class ID"
                      autoFocus
                      error={error}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                >
                    JOIN
                </Button>
                <Typography color="error" align="center">
                    {error && <p>{error.message}</p>}
                </Typography>
            </form>
        );
    }
}

const ERROR_ADD_MESSAGE = 'Something went wrong, please make sure you are logged in and try again'
class AddClassForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: '',
            error: null,
        };
    }
    onSubmit = (event) => {
       const {courseName} = this.state;
       const {history} = this.props;
       const data = {
           title: courseName
       };
       const token = 'Token ' + localStorage.getItem('token')
       fetch('http://localhost:8000/api/classroom/', {
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
           if (response.status !== undefined && response.status === "SUCCESS") {
               history.push(routes.CHATROOM + "?url=" + response.url, {url: response.url, permission: 3});
            }
           else {
               throw Error(ERROR_ADD_MESSAGE)
           }
       })
       .catch(error => this.setState({error: error}))
       event.preventDefault();
   }

    render() {
        const {classes} = this.props;
        const {error} = this.state;
        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel>Class Name</InputLabel>
                    <Input
                      value={this.state.courseName}
                      onChange={event => this.setState({courseName: event.target.value})}
                      type="text"
                      placeholder="Class Name"
                      autoFocus
                      error={error}
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    className={classes.submit}
                    variant="contained"
                >
                    CREATE
                </Button>
                <Typography color="error" align="center">
                    {error && <p>{error.message}</p>}
                </Typography>
            </form>
        );
    }
}

const AddJoinForm = withRouter(withStyles(FORM_STYLE)(AddJoinFormBasic));
export {AddJoinForm}
