import React from 'react';
import {CARD_STYLE} from '../constants/styles'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const AddTileBasic = ({classes, onPlusClick}) =>
      <React.Fragment>
          <CssBaseline/>
              <Grid item sm={6} md={4} lg={3}>
                  <Tooltip title="Add or Create Chatroom">
                      <Button onClick={onPlusClick} variant="fab" aria-label="Add" className={classes.addButton}>
                          <AddIcon className={classes.addIcon}/>
                      </Button>
                  </Tooltip>
            </Grid>
    </React.Fragment>

const AddTile = withStyles(CARD_STYLE)(AddTileBasic);
export {AddTile}
