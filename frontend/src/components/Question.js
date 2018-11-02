import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
//TODO: Add appropriate styling for chatroom component
import {INTRO_STYLE} from '../constants/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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
        const {question, classes} = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.lines}>
                        {question}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography className={classes.lines}>
                        {question}
                    </Typography>
                    <form onSubmit={this.onSubmit} className={classes.form}>
                        <FormControl margin="normal" required>
                            <TextField
								value={this.state.userAnswer}
								onChange={event => this.setState({userAnswer: event.target.value})}
								type="text"
								placeholder="Enter Answer Here"
                                multiline
                                fullWidth
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
const Question = withStyles(INTRO_STYLE)(QuestionBasic);
export {Question}
