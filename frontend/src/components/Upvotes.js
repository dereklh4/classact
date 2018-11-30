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
    handlePinClick = () => {
        WebSocketInstance.upvoteMessage(this.props.id)
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
                                <ThumbsUpFilled fontSize="small" style={{color: 'blue'}}/>
                                :
                                <ThumbsUp fontSize="small" style={{color: 'blue'}}/>
                                }
                            </IconButton>
                        ) :
                        (
                            <IconButton
                                onClick={() => this.handlePinClick()}
                                className={classes.pinButton}
                                disabled={pinned}
                            >
                                {pinned ?
                                <Whatshot fontSize="default" style={{color: 'blue'}}/>
                                :
                                <WhatshotOutlined fontSize="default" style={{color: 'blue'}}/>
                                }
                            </IconButton>
                        )
                    }
                </div>
        );
    }
}

export default withStyles(QUESTION_STYLE)(Upvotes)
