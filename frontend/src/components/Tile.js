import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { CARD_STYLE} from '../constants/styles'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

class TileBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    openSettings = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleClose = () => {
        this.setState({anchorEl: null});
    }
    removeClass = (courseName) => {
        console.log('//TODO: remove by url not name')
        this.props.onRemoveCourse(this.props.name);
        this.setState({anchorEl: null});
    }

    render() {
        const {name, professor, numenrolled, status, classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                    <Grid item sm={6} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={name}
                                titleTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                                action={
                                    <Button
                                        variant="fab"
                                        onClick={this.openSettings}
                                        className={classes.settingButton}>
                                          <SettingsIcon fontSize="small"/>
                                    </Button>
                                }
                            />

                            <Menu
                                anchorEl={this.state.anchorEl}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.removeClass}>Remove Class</MenuItem>
                            </Menu>

                            <CardContent className={classes.cardContent}>
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
                              <Link to={routes.CHATROOM} className={classes.link}>
                                  <Button
                                      type="submit"
                                      onClick={() => console.log('yo')}
                                      fullWidth className={classes.submit}
                                      variant="contained"
                                  >
                                          Enter: {name}
                                  </Button>
                              </Link>
                          </CardActions>
                      </Card>
                  </Grid>
          </React.Fragment>
        );
    }
}


const Tile = withStyles(CARD_STYLE)(TileBasic);
export {Tile}
