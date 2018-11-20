import React, {Component} from 'react';
import {EDIT_QUESTION_STYLE} from '../constants/styles'
import {BackButton} from './BackButton'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class EditQuestionFieldBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifiedQuestion: '',
        };
    }

    onSubmit = (event) => {
        this.props.onSubmitQuestionEdit(this.state.modifiedQuestion)
        this.props.closeEditMessageClick();
        event.preventDefault();
    }

    componentWillMount() {
        this.setState({modifiedQuestion: this.props.originalQuestion})
    }
    render() {
        const {isOpen, classes, originalQuestion, closeEditMessageClick, give} = this.props;
        return (
            <Dialog open={isOpen} className= {classes.dialog}>
                <BackButton backClick={closeEditMessageClick}/>
                {give === 1 ? <DialogTitle> Edit Response </DialogTitle> : <DialogTitle> Edit Question </DialogTitle>}
                 <DialogContent>
                     {give === 1 ? <DialogContentText> Enter Your Response Below  </DialogContentText> : <DialogContentText> Edit Your Question Below </DialogContentText>}
                     <form onSubmit={this.onSubmit} className={classes.questionForm}>
                         <FormControl margin="normal" fullWidth required>
                             <TextField
                                 label="Edit"
                                 multiline
                                 rows="3"
                                 value={this.state.modifiedQuestion}
                                 onChange={event => this.setState({modifiedQuestion: event.target.value})}
                                 type="text"
                                 placeholder={originalQuestion}
                                 fullWidth
                                 autoFocus
                                 variant="outlined"
                            />
                             <Button
                                 type="submit"
                                 fullWidth className={classes.submit}
                                 variant="contained"
                             >
                                 Submit Changes
                             </Button>
                         </FormControl>
                     </form>
                 </DialogContent>
            </Dialog>
        );
    }
}
const EditQuestionField = withStyles(EDIT_QUESTION_STYLE)(EditQuestionFieldBasic)
export {EditQuestionField}
