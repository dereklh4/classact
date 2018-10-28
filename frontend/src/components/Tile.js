import React from 'react';
import { Link } from 'react-router-dom';
import { CARD_STYLE} from '../constants/styles'
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

const TileBasic = ({name, professor, numenrolled, status, classes}) =>
      <React.Fragment>
          <CssBaseline/>
              <Grid item sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                            <Typography className={classes.tileText}>
                                 Name: {name}
                             </Typography>
                            <Typography className={classes.tileText}>
                                Professor: {professor}
                            </Typography>
                            <Typography className={classes.tileText}>
                                Number Enrolled: {numenrolled}
                            </Typography>
                            <Typography className={classes.tileText}>
                                 Status: {status}
                             </Typography>
                     </CardContent>
                     <CardActions>
                        <Link to={routes.CHATROOM}>
                            <Button
                                type="button"
                                onClick={() => console.log('yo')}
                                className={classes.submit}
                                variant="contained"
                                fullWidth
                            >
                                    Enter: {name}
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
    </React.Fragment>

const Tile = withStyles(CARD_STYLE)(TileBasic);
export {Tile}
