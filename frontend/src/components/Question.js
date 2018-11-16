import React, {Component} from 'react';
import {AnswerList} from './AnswerList'
import {DeleteButton} from './DeleteButton'
import {EditButton} from './EditButton'
import {EditQuestionField} from './EditQuestionField'
import Upvotes from './Upvotes'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


class QuestionBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAnswer: '',
            edit: false,
        };
    }
    onSubmit = (event) => {
        this.props.postResponseHandler(this.props.id, this.state.userAnswer)
        this.setState({userAnswer:''})
        event.preventDefault();
    }

    onSubmitQuestionEdit = (text) => {
         this.props.handleEditMessage(this.props.id, text)
    }
    openEditMessageClick = () => {
        this.setState({edit: true})
    }
    closeEditMessageClick = () => {
        this.setState({edit: false})
    }
    deleteMessage = () => {
        this.props.handleDeleteMessage(this.props.id)
    }

    handleChange = (event) => {
        this.setState({userAnswer: event.target.value});
    }

    render() {
        const {currUser, user, question, classes, id, upvotes, upvotedByUser, upvoteThisMessage, answers} = this.props;
        var questionShortened = question;
        if (question.length > 45) {
            questionShortened = question.substr(0,44) + '...'
        }
        return (
            <div>
                <EditQuestionField
                    isOpen={this.state.edit}
                    originalQuestion={question}
                    closeEditMessageClick={this.closeEditMessageClick}
                    onSubmitQuestionEdit={this.onSubmitQuestionEdit}
                />
                <ExpansionPanel className={classes.expansionPanel}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.questionSummary}>
                        <Upvotes id={id} upvotedByUser={upvotedByUser} numUpvotes={upvotes} upvoteThisMessage={upvoteThisMessage}/>
                        <Typography className={classes.upvotesText}>
                            {upvotes}
                        </Typography>
                        <Typography className={classes.questionSummaryText}>
                            {questionShortened}
                        </Typography>
                        {currUser === user ? (
                            <div>
                                <EditButton editMessage={this.openEditMessageClick}/>
                                <DeleteButton deleteMessage={this.deleteMessage}/>
                            </div>
                        )
                            :
                            null
                        }
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <div className={classes.fullQuestionContainer}>
                            <Typography className={classes.fullQuestionText}>
                                {question}
                            </Typography>
                        </div>
                        <AnswerList answers={answers}/>
                        <form onSubmit={this.onSubmit} className={classes.questionForm}>
                            <FormControl margin="normal" fullWidth required>
                                <TextField
                                    label="Enter Answer"
                                    multiline
                                    rows="3"
    								value={this.state.userAnswer}
    								onChange={event => this.setState({userAnswer: event.target.value})}
    								type="text"
    								placeholder="Enter Answer Here"
                                    fullWidth
                                    variant="outlined"
    							/>
                                <Button
                                    disabled={this.state.userAnswer === ''}
                                    type="submit"
                                    fullWidth className={classes.submit}
                                    variant="contained"
                                >
                                    Answer
                                </Button>
                            </FormControl>
                        </form>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}
const Question = withStyles(QUESTION_STYLE)(QuestionBasic);
export {Question}
