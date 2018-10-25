import React from 'react';
import {CA_STYLE, INTRO_STYLE} from '../constants/styles'
import * as routes from '../constants/routes';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const LandingPage = ({history, classes}) =>
    <React.Fragment>
        <CssBaseline/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <img style={CA_STYLE} src={require('../images/ClassActLogo.png')} alt="CA Logo"/>
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Welcome to ClassAct
                    </Typography>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={() => history.push(routes.SIGN_IN)}
                    >
                      Sign in
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={() => history.push(routes.SIGN_UP)}
                  >
                    Sign Up
                </Button>
              </Paper>
          </main>
    </React.Fragment>

export default withStyles(INTRO_STYLE)(LandingPage);
