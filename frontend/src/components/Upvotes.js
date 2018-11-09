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

    handleClick = () => {
        if (this.state.upvoted) {
            //Call un upvote
        }
        else {
            this.props.upvoteThisMessage(this.props.id);
        }
        this.setState({upvoted: !this.state.upvoted})
    }
    render() {
                    //    <button onClick={() => upvoteThisMessage(id)}>{numUpvotes}</button>
        const {numUpvotes} = this.props;
        return (
            <div>
                <IconButton
                    onClick={this.handleClick}
                >
                    {this.state.upvoted ?
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
