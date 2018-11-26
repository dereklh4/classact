import React from 'react';
import {Tile} from './Tile'
import { CARD_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {AddTile} from './AddTile.js';


const TileGridBasic = ({classes, onPlusClick, courses, onRemoveCourse}) =>
    <div className={classNames(classes.layout_tiles, classes.cardGrid)}>
        <Grid container spacing={40} wrap="nowrap">
            <AddTile onPlusClick={onPlusClick}/>
            {courses.map(a =>
                <Tile
                    name={a.classroom.title}
                    url={a.classroom.url}
                    numenrolled={a.classroom.enrolled}
                    onRemoveCourse={onRemoveCourse}
                    key={a.classroom.url}
                    permission={a.permission}
                />
            )}
        </Grid>
    </div>


const TileGrid = withStyles(CARD_STYLE)(TileGridBasic);
export {TileGrid}
