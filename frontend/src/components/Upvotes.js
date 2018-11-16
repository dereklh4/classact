import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUp from '@material-ui/icons/ThumbUpOutlined'
import ThumbsUpFilled from '@material-ui/icons/ThumbUp'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class Upvotes extends Component {
    handleClick = (upvotedByUser) => {
        if (upvotedByUser) {
            this.props.unUpvoteThisMessage(this.props.id);
            //alert("UnUpvote" + this.props.id);
        }
        else {
            this.props.upvoteThisMessage(this.props.id);
        }
    }
    render() {
        const {upvotedByUser, classes} = this.props;
        return (
                <IconButton
                    onClick={() => this.handleClick(upvotedByUser)}
                    className={classes.upvoteButton}
                >
                    {upvotedByUser ?
                    <ThumbsUpFilled fontSize="small" color="primary"/>
                    :
                    <ThumbsUp fontSize="small" color="primary"/>
                    }
                </IconButton>
        );
    }
}

export default withStyles(QUESTION_STYLE)(Upvotes)
