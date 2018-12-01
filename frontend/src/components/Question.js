import React, {Component} from 'react';
import {AnswerList} from './AnswerList'
import WebSocketInstance from '../services/WebSocket'
import classNames from 'classnames';
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
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Create from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Done from '@material-ui/icons/Done';
import StarFilled from '@material-ui/icons/Star';
import Star from '@material-ui/icons/StarOutlined';

class QuestionBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAnswer: '',
            edit: false,
            anchorEl: null,
        };
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    onSubmit = (event) => {
        WebSocketInstance.postResponse(this.props.id, this.state.userAnswer)
        this.setState({userAnswer:''})
        event.preventDefault();
    }

    onSubmitQuestionEdit = (text) => {
         WebSocketInstance.editMessage(this.props.id, text, true)
    }
    openEditMessageClick = () => {
        this.setState({anchorEl: null})
        this.setState({edit: true})
    }
    closeEditMessageClick = () => {
        this.setState({edit: false})
    }
    deleteMessage = () => {
        this.setState({anchorEl: null})
        WebSocketInstance.deleteMessage(this.props.id)
    }

    deleteResponse = (response_id) => {
        WebSocketInstance.deleteResponse(this.props.id, response_id)
    }

    upvoteQuestion = () => {
        WebSocketInstance.upvoteMessage(this.props.id)
    }

    pinMessage = () => {
        this.setState({anchorEl: null})
        WebSocketInstance.pinMessage(this.props.id);
    }

    saveMessage = () => {
        this.setState({anchorEl: null})
        WebSocketInstance.saveMessage(this.props.id);
    }

    unSaveMessage = () => {
        this.setState({anchorEl: null})
        WebSocketInstance.unSaveMessage(this.props.id);
    }
    resolveQuestion = () => {
        this.setState({anchorEl: null})
        WebSocketInstance.resolveMessage(this.props.id)
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
    render() {
        const {currUser, user, question, classes, id, upvotes, upvotedByUser, savedByUser, answers, permission, pinned, resolved} = this.props;
        const {anchorEl} = this.state;
        var questionShortened = question;
        if (question.length > 45) {
            questionShortened = question.substr(0,36) + '...'
        }
        return (
            <div>
                <EditField
                    isOpen={this.state.edit}
                    originalMessage={question}
                    closeEditMessageClick={this.closeEditMessageClick}
                    onSubmitQuestionEdit={this.onSubmitQuestionEdit}
                />
                <div className={classNames(classes.expansionPanel, {
                    [classes.expansionPanelEntries]: answers.length > 0,
                    [classes.expansionPanelResolved]: resolved === true
                })}>
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
                            {resolved ? '(Resolved) ' : null}{questionShortened}
                        </Typography>
                        <div>
                            <IconButton
                                onClick={this.handleClick}
                                className={classes.threeVerticalDot}
                                aria-label="Options"
                                aria-owns={anchorEl ? 'question-options-menu' : undefined}
                                aria-haspopup="true"
                            >
                                <MoreVertIcon size="default"/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                {currUser === user || permission > 1 ? (
                                    <div>
                                          <Tooltip title="Edit Question">
                                              <MenuItem onClick={this.openEditMessageClick}>
                                                  <IconButton className={classes.menuIcon}>
                                                      <Create fontSize="default" style={{color: 'blue'}}/>
                                                  </IconButton>
                                              </MenuItem>
                                          </Tooltip>
                                          <Tooltip title="Delete Question">
                                              <MenuItem onClick={this.deleteMessage}>
                                                  <IconButton className={classes.menuIcon}>
                                                      <RemoveCircle fontSize="default" style={{color: 'red'}}/>
                                                  </IconButton>
                                              </MenuItem>
                                          </Tooltip>
                                          {resolved !== true ? (
                                              <Tooltip title="Mark As Resolved">
                                                  <MenuItem onClick={this.resolveQuestion}>
                                                      <IconButton className={classes.menuIcon}>
                                                          <Done fontSize="default" style={{color: 'green'}}/>
                                                      </IconButton>
                                                  </MenuItem>
                                              </Tooltip>
                                          ) :
                                          null
                                        }      
                                      </div>
                                    ) :
                                        null
                                }
                                {
                                    permission > 1 && pinned === false ? (
                                        <Tooltip title="Pin Question">
                                            <MenuItem onClick={this.pinMessage}>
                                                <IconButton className={classes.menuIcon}>
                                                    <Flag fontSize="default" color="primary"/>
                                                </IconButton>
                                            </MenuItem>
                                        </Tooltip>
                                    ) :
                                    null
                                }
                                {
                                    savedByUser ? (
                                        <Tooltip title="Unsave Question">
                                            <MenuItem onClick={this.unSaveMessage}>
                                                <IconButton className={classes.menuIcon}>
                                                    <StarFilled fontSize="default" style={{color: "#e9cf08"}}/>
                                                </IconButton>
                                            </MenuItem>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Save Question">
                                            <MenuItem onClick={this.saveMessage}>
                                                <IconButton className={classes.menuIcon}>
                                                    <Star fontSize="default"/>
                                                </IconButton>
                                            </MenuItem>
                                        </Tooltip>
                                    )
                                }
                                </Menu>
                            </div>
                        </div>
                    <ExpansionPanel expanded={this.props.open} onChange={(event, expanded) => this.handlePanelOpen(expanded)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>} className={classes.expanded}/>
                        <ExpansionPanelDetails className={classes.details}>
                            <div className={classes.fullQuestionContainer}>
                                <Typography className={classes.fullQuestionText}>
                                    {question}
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
