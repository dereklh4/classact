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
      //TODO: Add api call for real data
        const dummyData = [
          {name: 'intro to algos', professor: 'dr Algo', enrolled: 10, status: 'Student'},
          {name: 'intro to balgos', professor: 'dr Balgo', enrolled: 100, status: 'Prof'},
          {name: 'intro to Calalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
          {name: 'intro to Calalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
          {name: 'intro to Calalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
        ];
        return (
          <div>
            <h1>Home</h1>
            <h2>Classrooms</h2>
            <AddJoinForm formOpen={this.state.formOpen} onPlusClickAway={this.onPlusClickAway}/>
            <TileGrid courses={dummyData} onPlusClick={this.onPlusClick}/>
            <SignOutButton/>
          </div>
        )
    }
}

export default withStyles(CARD_STYLE)(HomePage);
