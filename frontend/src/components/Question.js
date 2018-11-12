import React, {Component} from 'react';
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
import Upvotes from './Upvotes'
class QuestionBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAnswer: '',
        };
    }
    onSubmit = (event) => {
        alert('TODO: MAKE API CALL HERE A answer: ' + this.state.userAnswer);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({userAnswer: event.target.value});
    }

    render() {
        /*
        TODO: Add for answers
        <ul>
            {_.reverse(question.answers).map(answer =>
                <Answer answer={answer}/>
            )}
        </ul>
        */
        const {question, classes, id, upvotes, upvotedByUser} = this.props;
        var questionShortened = question;
        if (question.length > 45) {
            questionShortened = question.substr(0,44) + '...'
        }
        return (
            <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} className={classes.questionSummary}>
                    <Upvotes id={id} upvotedByUser={upvotedByUser} numUpvotes={upvotes} upvoteThisMessage={this.props.upvoteThisMessage}/>
                    <Typography className={classes.upvotesText}>
                        {upvotes}
                    </Typography>
                    <Typography className={classes.questionSummaryText}>
                        {questionShortened}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.fullQuestionContainer}>
                        <Typography className={classes.fullQuestionText}>
                            {question}
                        </Typography>
                    </div>
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

        );
    }
}
const Question = withStyles(QUESTION_STYLE)(QuestionBasic);
export {Question}
