import React, {Component} from 'react';
import {AnswerList} from './AnswerList'
import WebSocketInstance from '../services/WebSocket'
import classNames from 'classnames';
import {DeleteButton} from './DeleteButton'
import {EditButton} from './EditButton'
import {EditField} from './EditField'
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Flag from '@material-ui/icons/Flag';

class QuestionBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAnswer: '',
            edit: false,
            anchorEl: null,
        };
    }
    onSubmit = (event) => {
        WebSocketInstance.postResponse(this.props.id, this.state.userAnswer)
        this.setState({userAnswer:''})
        event.preventDefault();
    }

    onSubmitQuestionEdit = (text) => {
         WebSocketInstance.editMessage(this.props.id, text, true)
    }
    openEditMessageClick = () => {
        this.setState({edit: true})
    }
    closeEditMessageClick = () => {
        this.setState({edit: false})
    }
    deleteMessage = () => {
        WebSocketInstance.deleteMessage(this.props.id)
    }

    deleteResponse = (response_id) => {
        WebSocketInstance.deleteResponse(this.props.id, response_id)
    }

    upvoteQuestion = () => {
        WebSocketInstance.upvoteMessage(this.props.id)
    }

    unUpvoteMessage = () => {
        WebSocketInstance.unUpvoteMessage(this.props.id)
    }

    handleChange = (event) => {
        this.setState({userAnswer: event.target.value});
    }

    handlePanelOpen = (expanded) => {
        if (expanded) {
            this.props.setOpen(this.props.id)
        }
        else {
            this.props.setOpen('')
        }
    }

    handleOpenMenu = event => {
      this.setState({ anchorEl : event.currentTarget });
    };

    handleCloseMenu = event => {
      this.setState({anchorEl : null});
    }

    handleEdit = () => {
      this.setState( {anchorEl: null});
      this.openEditMessageClick();
    };

    handleDelete = () => {
      this.setState( {anchorEl: null});
      this.deleteMessage();
    };

    render() {
        const {currUser, user, question, classes, id, upvotes, upvotedByUser, answers, permission, pinned} = this.props;
        const {anchorEl} = this.state;
        var questionShortened = question;
        if (question.length > 45) {
            questionShortened = question.substr(0,44) + '...'
        }
        return (
            <div>
                <EditField
                    isOpen={this.state.edit}
                    originalMessage={question}
                    closeEditMessageClick={this.closeEditMessageClick}
                    onSubmitQuestionEdit={this.onSubmitQuestionEdit}
                />
                <div className={classes.expansionPanel}>
                    <div className={classes.questionHeader}>
                        <Upvotes
                            id={id}
                            upvotedByUser={upvotedByUser}
                            numUpvotes={upvotes}
                            unUpvoteThisMessage={this.unUpvoteMessage}
                            upvoteThisMessage={this.upvoteQuestion}
                            permission={permission}
                            pinned={pinned}
                        />
                        <Typography className={classNames(classes.upvotesText, {
                            [classes.pinnedText]: pinned === true
                        })}>
                            {upvotes}
                        </Typography>

                        <Typography className={classes.questionSummaryText}>
                            {questionShortened}
                        </Typography>
                        {currUser === user ? (
                          <div>
                              <IconButton
                                aria-label="Options"
                                aria-owns={anchorEl ? 'question-options-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpenMenu}
                                disableRipple="true"
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id="question-options-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleCloseMenu}
                              >
                                  <MenuItem onClick={this.handleEdit}>
                                    <EditButton/>
                                  </MenuItem>
                                  <MenuItem onClick={this.handleDelete}>
                                    <DeleteButton/>
                                  </MenuItem>
                                  <MenuItem onClick={this.handlePin}>
                                    <IconButton>
                                      <Flag/>
                                    </IconButton>
                                  </MenuItem>
                              </Menu>
                          </div>
                            ) :
                            null
                        }
                        </div>
                    <ExpansionPanel expanded={this.props.open} onChange={(event, expanded) => this.handlePanelOpen(expanded)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} className={classes.expanded}/>
                        <ExpansionPanelDetails className={classes.details}>
                            <div className={classes.fullQuestionContainer}>
                                <Typography className={classes.fullQuestionText}>
                                    {question}
                                </Typography>
                                <Typography className={classes.questionInfoText}>
                                    {user}
                                </Typography>
                            </div>
                            <AnswerList answers={answers} user={user} currUser={currUser} deleteResponse={this.deleteResponse} message_id={id}/>
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
            </div>
        );
    }
}
const Question = withStyles(QUESTION_STYLE)(QuestionBasic);
export {Question}
