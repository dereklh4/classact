import React from 'react';
import {Tile} from './Tile'
import { CARD_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {AddTile} from './AddTile.js';


const TileGridBasic = ({classes, onPlusClick, courses, onRemoveCourse}) =>
    <div className={classNames(classes.layout_tiles, classes.cardGrid)}>
        <Grid container spacing={40}>
            {courses.map(a =>
                <Tile
                    name={a.title}
                    url={a.url}
                    numenrolled={a.enrolled}
                    status={a.status}
                    onRemoveCourse={onRemoveCourse}
                    key={a.url}
                />
            )}
            <AddTile onPlusClick={onPlusClick}/>
        </Grid>
    </div>


const TileGrid = withStyles(CARD_STYLE)(TileGridBasic);
export {TileGrid}
