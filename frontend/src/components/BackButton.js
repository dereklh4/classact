import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close'
import withStyles from '@material-ui/core/styles/withStyles';

import {EDIT_QUESTION_STYLE} from '../constants/styles';

class BackButtonBasic extends Component {
    render() {
        const {classes, backClick} = this.props;
        return (
            <IconButton onClick={backClick} className={classes.backButton}>
                <Close fontSize="default" color="primary"/>
            </IconButton>
        )
    }

}

const BackButton = withStyles(EDIT_QUESTION_STYLE)(BackButtonBasic)
export {BackButton}
