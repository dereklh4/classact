import React, {Component} from 'react';
import WebSocketInstance from '../services/WebSocket'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import {EditField} from './EditField'
import Upvotes from './Upvotes'
import {RESPONSE_STYLE} from '../constants/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import _ from 'lodash';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Flag from '@material-ui/icons/TurnedIn';
import Create from '@material-ui/icons/Create';
import RemoveCircle from '@material-ui/icons/RemoveCircle'

class AnswerListBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editAnswerForm: false,
            responseId: '',
            text: '',
            anchorEl: null
        };
    }

    openEditResponseClick = (response_id, text) => {
        this.setState( {anchorEl: null});
        this.setState({editAnswerForm: true, responseId: response_id, text: text})
    }
    closeEditResponseClick = () => {
        this.setState({editAnswerForm: false, responseId: '', text: ''})
    }
    upvoteResponse = (response_id) => {
        WebSocketInstance.upvoteResponse(this.props.message_id, response_id)
    }
    unUpvoteResponse = (response_id) => {
        WebSocketInstance.unUpvoteResponse(this.props.message_id, response_id)
    }
    submitResponseEdit = (text) => {
        WebSocketInstance.editResponse(this.props.message_id, this.state.responseId, text, true);
    }
    handleOpenMenu = event => {
        this.setState({ anchorEl : event.currentTarget });
    };
    handleCloseMenu = () => {
        this.setState( {anchorEl: null});
    };
    handleDelete = (response_id) => {
        this.props.deleteResponse(response_id);
        this.setState( {anchorEl: null});
    }
    handleEndorse = (response_id) => {
        this.setState( {anchorEl: null});
        WebSocketInstance.endorseResponse(this.props.message_id, response_id)
    }
    render() {
        const {answers, classes, currUser, permission} = this.props;
        const {anchorEl} = this.state;
        return (
            <div>
                <EditField
                    give={1}
                    isOpen={this.state.editAnswerForm}
                    closeEditMessageClick={this.closeEditResponseClick}
                    originalMessage={this.state.text}
                    onSubmitQuestionEdit={this.submitResponseEdit}
                />
                <div className={classes.answerBox}>
                    <Typography className={classes.title}>
                        Answers
                    </Typography>
                    <div className={classes.topAnswerHolder}>
                        <Typography className={classes.topAnswerText}>
                            Top Answer: {(answers.length > 0) ? (_.maxBy(answers, function (o) {
                                return o.upvotes;
                            }).text) : 'None'}
                        </Typography>
                    </div>
                    <List dense>
                        {_.sortBy(_.sortBy(answers, ['hour', 'minute', 'second']).reverse(), 'endorsed').reverse().map(answer =>
                            <ListItem key={answer.response_id} className={classes.listItem}>
                                <Upvotes
                                    id={answer.response_id}
                                    upvotedByUser={answer.upvoted_by_user}
                                    unUpvoteThisMessage={this.unUpvoteResponse}
                                    upvoteThisMessage={this.upvoteResponse}
                                    isResponse={true}
                                />
                                <Typography className={classNames(classes.upvotesText, {
                                    [classes.upvotesTextEndorsed]: answer.endorsed === true
                                })}>
                                    {answer.upvotes}
                                </Typography>
                                <Avatar className={classes.avatar}>
                                    <img className={classes.image} src={require('../images/ListArrow.png')} alt="CA Logo"/>
                                </Avatar>
                                <Typography className={classes.answerText}>
                                    {answer.text}
                                </Typography>
                                {currUser === answer.user ? (
                                  <div>
                                    <IconButton
                                      aria-label="Options"
                                      aria-owns={anchorEl ? 'question-options-menu' : undefined}
                                      aria-haspopup="true"
                                      onClick={this.handleOpenMenu}
                                      className={classes.threeVerticalDot}
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      id="question-options-menu"
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={this.handleCloseMenu}
                                    >
                                    {currUser === answer.user ? (
                                      <div>
                                        <Tooltip title="Edit Reponse">
                                          <MenuItem onClick={() => this.openEditResponseClick(answer.response_id, answer.text)}>
                                            <IconButton className={classes.menuIcon}>
                                              <Create fontSize="default" style={{color: 'blue'}}/>
                                            </IconButton>
                                          </MenuItem>
                                        </Tooltip>
                                        <Tooltip title="Delete Response">
                                          <MenuItem onClick={() => this.handleDelete(answer.response_id)}>
                                            <IconButton className={classes.menuIcon}>
                                              <RemoveCircle fontSize="default" style={{color: 'red'}}/>
                                            </IconButton>
                                          </MenuItem>
                                        </Tooltip>
                                      </div>
                                    ) : null}
                                    {permission > 1 && answer.endorsed === false ? (
                                      <Tooltip title="Endorse Response">
                                        <MenuItem onClick={() => this.handleEndorse(answer.response_id)}>
                                          <IconButton className={classes.menuIcon}>
                                            <Flag fontSize="default" style={{color: "#e9cf08"}}/>
                                          </IconButton>
                                        </MenuItem>
                                      </Tooltip>
                                    ) : null}
                                  </Menu>
                                </div>
                                )
                                :
                                null
                                }
                            </ListItem>
                        )}
                    </List>
                </div>
            </div>
        );
    }
}


const AnswerList = withStyles(RESPONSE_STYLE)(AnswerListBasic)
export {AnswerList};
