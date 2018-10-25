import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PasswordForgetLink} from './PasswordForget';
import {SignUpLink} from './SignUp';
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


const SignInPage = ({history, onUserChange, classes}) =>
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
                    Sign in
                </Typography>
                <SignInForm
                    history={history}
                    onUserChange={onUserChange}
                    classes={classes}
                />
                <PasswordForgetLink/>
                <SignUpLink/>
            </Paper>
        </main>
    </React.Fragment>

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const SIGN_IN_ERROR = 'Sorry, your email or password does not match our records.' +
    ' Please try again.'

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE
        };
    }

    onSubmit = (event) => {
        const {email, password} = this.state;

        const data = {
            email,
            password
        };

        const {history} = this.props;

        fetch('http://localhost:8000/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(response => {
            if (response.key === undefined) {
                throw Error(response);
            }
            localStorage.setItem('token', response.key);
            this.props.onUserChange(response.key);
            history.push(routes.HOME);
        }).catch(error => {
            this.setState({error: SIGN_IN_ERROR});
        });

        event.preventDefault();
    }

    render() {
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        const {classes} = this.props;
        return (
            <form onSubmit={this.onSubmit} className={classes.form}>
                <FormControl margin="normal" required fullWidth error={error}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                        value={email}
                        onChange={event => this.setState({email: event.target.value})}
                        type="text"
                        placeholder="Email Address"
                        autoComplete="email"
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        value={password}
                        onChange={event => this.setState({password: event.target.value})}
                        type="password"
                        placeholder="Password"/>
                </FormControl>
                <Button
                    disabled={isInvalid}
                    type="submit"
                    fullWidth className={classes.submit}
                    variant="contained"
                >
                    Sign In
                </Button>
                <Typography color="error" align="center">
                    {error && <p>{error}</p>}
                </Typography>
            </form>
        );
    }
}

const SignInLink = () =>
  <p>
    Already have an account?
    {' '}
    <Link to={routes.SIGN_IN}>Sign In</Link>
  </p>
export default withRouter(withStyles(INTRO_STYLE)(SignInPage));

export {
    SignInForm,
    SignInLink
};
