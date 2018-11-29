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

class EditFieldBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifiedMessage: '',
        };
    }

    onSubmit = (event) => {
        this.props.onSubmitQuestionEdit(this.state.modifiedMessage)
        this.props.closeEditMessageClick();
        event.preventDefault();
    }

    componentWillMount() {
        this.setState({modifiedMessage: this.props.originalMessage})
    }
    render() {
        const {isOpen, classes, originalMessage, closeEditMessageClick, give} = this.props;
        return (
            <Dialog open={isOpen} className= {classes.dialog}>
                <BackButton backClick={closeEditMessageClick}/>
                {
                    give === 1 ?
                    <DialogTitle> Edit Response </DialogTitle>
                    :
                    (
                        give === 2 ?
                        <DialogTitle> Edit Title </DialogTitle>
                        :
                        <DialogTitle> Edit Question </DialogTitle>
                    )
                }
                 <DialogContent>
                     {
                         give === 1 ?
                         <DialogContentText> Enter Your Response Below  </DialogContentText>
                         :
                         (
                             give === 2 ?
                             <DialogContentText> Edit Your Title Below </DialogContentText>
                             :
                             <DialogContentText> Edit Your Question Below </DialogContentText>
                         )
                     }
                     <form onSubmit={this.onSubmit} className={classes.questionForm}>
                         <FormControl margin="normal" fullWidth required>
                             <TextField
                                 label="Edit"
                                 multiline
                                 rows="3"
                                 value={this.state.modifiedMessage}
                                 onChange={event => this.setState({modifiedMessage: event.target.value})}
                                 type="text"
                                 placeholder={originalMessage}
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
const EditField = withStyles(EDIT_QUESTION_STYLE)(EditFieldBasic)
export {EditField}
