import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {SignInLink} from './SignIn';
import * as routes from '../constants/routes';
import {CA_STYLE, INTRO_STYLE} from '../constants/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const PasswordForgetPage = ({classes}) =>
    <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img
                        style={CA_STYLE}
                        src={require('../images/ClassActLogo.png')}
                        alt="CA Logo"
                    />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Password Forget
                </Typography>
                <PasswordForgetForm classes={classes}/>
                <SignInLink/>
            </Paper>
        </main>
    </React.Fragment>


const INITIAL_STATE = {
  email: '',
  error: 'TODO: SUBMITTING WILL DO NOTHING',
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const {classes} = this.props;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                  value={email}
                  onChange={event => this.setState({'email': event.target.value})}
                  type="text"
                  placeholder="Email Address"
              />
          </FormControl>
          <Button
              disabled={isInvalid}
              type="submit"
              fullWidth className={classes.submit}
              variant="contained"
              >
                  Reset My Password
          </Button>

          <Typography color="error" align="center">
              {error && <p>{error}</p>}
          </Typography>
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default withStyles(INTRO_STYLE)(PasswordForgetPage);

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
