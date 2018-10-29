import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FORM_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';

class AddJoinFormBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currTab: 0,
            className: '',
            classID: '',
        };
    }

    changeTab = (event, value) => {
        this.setState({currTab: value})
    }

    onSubmit = () => {
        console.log('yoyoy')
    }
    render() {
        const {formOpen, onPlusClickAway, classes} = this.props;
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
                        <AddClassForm
                            classes={classes}
                            onSubmit={this.onSubmit}
                            className={this.state.className}/>
                        :
                        <JoinClassForm
                            classes={classes}
                            onSubmit={this.onSubmit}
                            classID={this.state.classID}/>
                    }
                 </DialogContent>
                 <DialogActions>
                     <Button></Button>
                 </DialogActions>
               </Dialog>
             </div>
        );
    }
}

const AddClassForm = ({classes, onSubmit, className}) =>
    <form onSubmit={onSubmit} className={classes.form}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel>Class Name</InputLabel>
            <Input
              value={className}
              onChange={event => this.setState({className: event.target.value})}
              type="text"
              placeholder="Class Name"
            />
        </FormControl>
        <Button
            type="submit"
            fullWidth
            className={classes.submit}
            variant="contained"
        >
            ADD
        </Button>
    </form>

//TODO: Change to class with its own state
const JoinClassForm = ({classes, onSubmit, classID}) =>
    <form onSubmit={onSubmit} className={classes.form}>
        <FormControl margin="normal" required fullWidth>
            <InputLabel>Class ID</InputLabel>
            <Input
              value={classID}
              onChange={event => this.setState({classID: event.target.value})}
              type="text"
              placeholder="Class ID"
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
    </form>



const AddJoinForm = withStyles(FORM_STYLE)(AddJoinFormBasic);
export {AddJoinForm}
