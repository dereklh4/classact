import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create'
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class Edit extends Component {
    render() {
        const {classes} = this.props;
        return (
            <IconButton className={classes.editButton}>
              <Create fontSize="small" color="primary"/>
            </IconButton>
        )
    }

}

export default withStyles(QUESTION_STYLE)(Edit)
