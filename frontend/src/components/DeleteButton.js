import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import {QUESTION_STYLE} from '../constants/styles';

class DeleteButtonBasic extends Component {
    render() {
        const {classes, deleteMessage, give} = this.props;
        return (
            <Tooltip title="Delete Question">
                <IconButton onClick={deleteMessage} className={classNames(classes.deleteButton, {
                    [classes.deleteResponseButton]: give === 1,
                })}>
                    <RemoveCircle fontSize="default" color="secondary"/>
                </IconButton>
            </Tooltip>
        )
    }

}

const DeleteButton = withStyles(QUESTION_STYLE)(DeleteButtonBasic)
export {DeleteButton}
