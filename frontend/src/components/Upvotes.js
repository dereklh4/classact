import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import WebSocketInstance from '../services/WebSocket'
import ThumbsUp from '@material-ui/icons/ThumbUpOutlined'
import ThumbsUpFilled from '@material-ui/icons/ThumbUp'
import Whatshot from '@material-ui/icons/DoneRounded'
import WhatshotOutlined from '@material-ui/icons/DoneOutlineRounded'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class Upvotes extends Component {
    handleUpvoteClick = (upvotedByUser) => {
        if (upvotedByUser) {
            this.props.unUpvoteThisMessage(this.props.id);
        }
        else {
            this.props.upvoteThisMessage(this.props.id);
        }
    }
    render() {
        const {upvotedByUser, classes, permission, pinned} = this.props;
        return (
                <div>
                    <IconButton
                        onClick={() => this.handleUpvoteClick(upvotedByUser)}
                        className={classes.upvoteButton}
                    >
                        {upvotedByUser ?
                        <ThumbsUpFilled fontSize="small" color="primary"/>
                        :
                        <ThumbsUp fontSize="small" color="primary"/>
                        }
                    </IconButton>
                </div>
        );
    }
}

export default withStyles(QUESTION_STYLE)(Upvotes)
