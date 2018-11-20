import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {DeleteButton} from './DeleteButton'
import {EditButton} from './EditButton'
import {EditField} from './EditField'
import {RESPONSE_STYLE} from '../constants/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import WebSocketInstance from '../services/WebSocket'
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

class AnswerListBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editAnswerForm: false,
            responseId: '',
            text: ''
        };
    }

    openEditResponseClick = (response_id, text) => {
        this.setState({editAnswerForm: true, responseId: response_id, text: text})
    }
    closeEditResponseClick = () => {
        this.setState({editAnswerForm: false, responseId: '', text: ''})
    }
    submitResponseEdit = (text) => {
        WebSocketInstance.editResponse(this.props.message_id, this.state.responseId, text, true);
    }
    render() {
        const {answers, classes, deleteResponse, currUser, user} = this.props;
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
                    <List dense>
                        {answers.map(answer =>
                            <ListItem key={answer.response_id} className={classes.listItem}>
                                <Avatar className={classes.avatar}>
                                    <img className={classes.image} src={require('../images/ListArrow.png')} alt="CA Logo"/>
                                </Avatar>
                                <Typography className={classes.answerText}>
                                    {answer.text}
                                </Typography>
                                {currUser === user ? (
                                <div>
                                <DeleteButton deleteMessage={() => deleteResponse(answer.response_id)} give={1}/>
                                <EditButton editMessage={() => this.openEditResponseClick(answer.response_id, answer.text)} give={1}/>
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
