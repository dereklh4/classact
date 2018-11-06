import React, {Component} from 'react';
import {Tile} from './Tile'
import { CARD_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {AddTile} from './AddTile.js';

//TODO: have url be specific key for each course
//TODO: Add api call for real data
  const dummyData = [
    {name: 'intro to Algos', professor: 'dr Algo', enrolled: 10, status: 'Student'},
    {name: 'intro to Balgos', professor: 'dr Balgo', enrolled: 100, status: 'Prof'},
    {name: 'intro to Calalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
    {name: 'intro to Dalalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
    {name: 'intro to Ealalgos', professor: 'dr CAlgo', enrolled: 999, status: 'Student'},
  ];

class TileGridBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        // TODO: reserved for an api call
        this.setState({courses: dummyData});
    }

    onRemoveCourse = (id) => {
        const {courses} = this.state;
        //TODO: change to url
        const isNotId = item => item.name !== id;
        const updatedCourses = courses.filter(isNotId);
        this.setState({courses: updatedCourses})
        alert('TODO: Make API call here')
    }
    render() {
        const {classes, onPlusClick} = this.props;
        return (
            <div className={classNames(classes.layout_tiles, classes.cardGrid)}>
                <Grid container spacing={40}>
                    {this.state.courses.map(a =>
                        <Tile
                            name={a.name}
                            professor={a.professor}
                            numenrolled={a.enrolled}
                            status={a.status}
                            onRemoveCourse={this.onRemoveCourse}
                        />
                    )}
                    <AddTile onPlusClick={onPlusClick}/>
                </Grid>

            </div>
        );
    }
}

const TileGrid = withStyles(CARD_STYLE)(TileGridBasic);
export {TileGrid}
