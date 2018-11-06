import React, {Component} from 'react';
import {SignOutButton} from './SignOut'
import { CARD_STYLE} from '../constants/styles'
import {TileGrid} from './TileGrid'
import {AddJoinForm} from './AddJoinForm'
import withStyles from '@material-ui/core/styles/withStyles';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
        };
    }

    onPlusClick = () => {
        this.setState({
            formOpen: true,
        })
    }

    onPlusClickAway = () => {
        this.setState({
            formOpen: false,
        })
    }

    render() {
        return (
          <div>
            <h1>Home</h1>
            <h2>Classrooms</h2>
            <AddJoinForm formOpen={this.state.formOpen} onPlusClickAway={this.onPlusClickAway}/>
            <TileGrid onPlusClick={this.onPlusClick}/>
            <SignOutButton onUserChange={this.props.onUserChange}/>
          </div>
        )
    }
}

export default withStyles(CARD_STYLE)(HomePage);
