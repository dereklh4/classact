import React from 'react';
import { Link } from 'react-router-dom';
import {INTRO_STYLE} from '../constants/styles';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//TODO: ENSURE ALL SIGNOUTS CAN change the navigation rendering

function logout() {
    fetch('http://localhost:8000/api/auth/logout/', {
        method: 'POST'
    })
    .catch(error => {});
    localStorage.removeItem('token');
}
const BasicSignOutButton = ({classes}) =>
    <Link to={routes.LANDING}>
        <Button
            type="button"
            onClick={logout}
            className={classes.submit}
        >
                Sign Out
        </Button>
    </Link>

const SignOutButton = withStyles(INTRO_STYLE)(BasicSignOutButton)

export  {SignOutButton};
