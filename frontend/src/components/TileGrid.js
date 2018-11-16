import React from 'react';
import {Tile} from './Tile'
import { CARD_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {AddTile} from './AddTile.js';

const getStatus = (permission) => {
    switch (permission) {
        case 3:
            return 'Creator';
        case 2:
            return 'Moderator';
        case 1:
            return 'Student';
        case 0:
            return 'Blocked';
        default:
            return 'Unknown'

    }

}
const TileGridBasic = ({classes, onPlusClick, courses, onRemoveCourse}) =>
    <div className={classNames(classes.layout_tiles, classes.cardGrid)}>
        <Grid container spacing={40}>
            {courses.map(a =>
                <Tile
                    name={a.classroom.title}
                    url={a.classroom.url}
                    numenrolled={a.classroom.enrolled}
                    onRemoveCourse={onRemoveCourse}
                    key={a.classroom.url}
                    status={getStatus(a.permission)}
                />
            )}
            <AddTile onPlusClick={onPlusClick}/>
        </Grid>
    </div>


const TileGrid = withStyles(CARD_STYLE)(TileGridBasic);
export {TileGrid}
