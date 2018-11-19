import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {DeleteButton} from './DeleteButton'
import {EditButton} from './EditButton'
import {RESPONSE_STYLE} from '../constants/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

class AnswerListBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editAnswerForm: false
        };
    }

    editResponse = () => {
        alert('yo')
    }
    render() {
        const {answers, classes, deleteResponse, currUser, user} = this.props;
        return (
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
                            <EditButton editMessage={this.editResponse} give={1}/>
                            </div>
                            )
                            :
                            null
                            }
                        </ListItem>
                    )}
                </List>
            </div>
        );
    }
}


const AnswerList = withStyles(RESPONSE_STYLE)(AnswerListBasic)
export {AnswerList};
