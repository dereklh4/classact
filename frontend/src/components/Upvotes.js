import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUp from '@material-ui/icons/ThumbUpOutlined'
import ThumbsUpFilled from '@material-ui/icons/ThumbUp'
import Typography from '@material-ui/core/Typography';

class Upvotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoted: false
        };
    }

    handleClick = (upvotedByUser) => {
        if (upvotedByUser) {
            return;
        }
        else {
            this.props.upvoteThisMessage(this.props.id);
        }
    }
    render() {
        const {numUpvotes, upvotedByUser} = this.props;
        return (
            <div>
                <IconButton
                    onClick={() => this.handleClick(upvotedByUser)}
                >
                    {upvotedByUser ?
                    <ThumbsUpFilled color="primary"/>
                    :
                    <ThumbsUp color="primary"/>
                    }
                </IconButton>
                <Typography>
                    {numUpvotes}
                </Typography>
            </div>
        );
    }
}

export default Upvotes
