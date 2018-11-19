import React, {Component} from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create'
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import {QUESTION_STYLE} from '../constants/styles';

class EditButtonBasic extends Component {
    render() {
        const {classes, editMessage, give} = this.props;
        return (
            <Tooltip title="Edit Question">
                <IconButton onClick={editMessage} className={classNames(classes.editButton, {
                    [classes.editResponseButton]: give === 1,
                })}>
                    <Create fontSize="default" color="primary"/>
                </IconButton>
            </Tooltip>
        )
    }

}

const EditButton = withStyles(QUESTION_STYLE)(EditButtonBasic)
export {EditButton}
