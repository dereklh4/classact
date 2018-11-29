import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import WebSocketInstance from '../services/WebSocket'
import ThumbsUp from '@material-ui/icons/ThumbUpOutlined'
import ThumbsUpFilled from '@material-ui/icons/ThumbUp'
import Whatshot from '@material-ui/icons/WhatshotTwoTone'
import WhatshotOutlined from '@material-ui/icons/WhatshotOutlined'
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
    handlePinClick = () => {
        WebSocketInstance.pinMessage(this.props.id);
    }
    render() {
        const {upvotedByUser, classes, permission, pinned} = this.props;
        return (
                <div>
                    {permission <= 1 ?
                        (
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
                        ) :
                        (
                            <IconButton
                                onClick={() => this.handlePinClick()}
                                className={classes.upvoteButton}
                                disabled={pinned}
                            >
                                {pinned ?
                                <Whatshot fontSize="small" color="secondary"/>
                                :
                                <WhatshotOutlined fontSize="small" color="secondary"/>
                                }
                            </IconButton>
                        )
                    }
                </div>
        );
    }
}

export default withStyles(QUESTION_STYLE)(Upvotes)
