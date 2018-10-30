import React from 'react';
import {Tile} from './Tile'
import { CARD_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {AddTile} from './AddTile.js';

const TileGridBasic = ({courses, classes, onPlusClick}) =>
    <div className={classNames(classes.layout_tiles, classes.cardGrid)}>
        <Grid container spacing={40}>
            <AddTile onPlusClick={onPlusClick}/>
            {courses.map(a =>
                <Tile name={a.name} professor={a.professor} numenrolled={a.enrolled} status={a.status}/>
            )}
        </Grid>

    </div>

const TileGrid = withStyles(CARD_STYLE)(TileGridBasic);
export {TileGrid}
