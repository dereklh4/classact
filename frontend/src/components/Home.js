import React, {Component} from 'react';
import {SignOutButton} from './SignOut'
import { CARD_STYLE} from '../constants/styles'
import {Tile} from './Tile'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';

class HomePage extends Component {
  render() {
      //TODO: Add api call for real data
    const {classes} = this.props;
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
        <div className={classNames(classes.layout_tiles, classes.cardGrid)}>
            <Grid container spacing={40}>
            {dummyData.map(a =>
                <Tile name={a.name} professor={a.professor} numenrolled={a.enrolled} status={a.status}/>
            )}
            </Grid>
        </div>
        <SignOutButton/>
      </div>
    )
  }
}

export default withStyles(CARD_STYLE)(HomePage);
