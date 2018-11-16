import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
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
    removeClass = () => {
        this.props.onRemoveCourse(this.props.url);
        this.setState({anchorEl: null});
    }

    getStatus = (permission) => {
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
    render() {
        const {name, url, numenrolled, permission, classes, history} = this.props;
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
                                      URL: {url}
                                  </Typography>
                                  <Typography className={classes.tileText}>
                                      Number Enrolled: {numenrolled}
                                  </Typography>
                                  <Typography className={classes.tileText}>
                                       Status: {this.getStatus(permission)}
                                   </Typography>
                           </CardContent>
                           <CardActions>
                                  <Button
                                      type="submit"
                                      onClick={() => history.push(routes.CHATROOM + "?url=" + url, {url: url})}
                                      fullWidth className={classes.submit}
                                      variant="contained"
                                  >
                                          Enter: {name}
                                  </Button>
                          </CardActions>
                      </Card>
                  </Grid>
          </React.Fragment>
        );
    }
}


const Tile = withRouter(withStyles(CARD_STYLE)(TileBasic));
export {Tile}
