import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import {QUESTION_STYLE} from '../constants/styles';

class DeleteButtonBasic extends Component {
    render() {
        const {classes, deleteMessage} = this.props;
        return (
            <Tooltip title="Delete Question">
                <IconButton onClick={deleteMessage} className={classes.deleteButton}>
                    <RemoveCircle fontSize="default" color="secondary"/>
                </IconButton>
            </Tooltip>
        )
    }

}

const DeleteButton = withStyles(QUESTION_STYLE)(DeleteButtonBasic)
export {DeleteButton}
