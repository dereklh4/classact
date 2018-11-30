import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {EditField} from './EditField'
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
            anchorEl: null,
            changeNameFormOpen: false,
            changed: false,
            changedName: ''
        };
    }

    openSettings = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    handleClose = () => {
        this.setState({anchorEl: null});
    }
    openChangeForm = () => {
        this.setState({changeNameFormOpen: true})
    }
    closeChangeForm = () => {
        this.setState({changeNameFormOpen: false})
    }
    removeClass = () => {
        this.props.onRemoveCourse(this.props.url);
        this.setState({anchorEl: null});
    }
    onSubmitQuestionEdit = (new_name) => {
        const token = 'Token ' + localStorage.getItem('token')
        const url = 'http://localhost:8000/api/classroom/update/'
        const data = {
            url: this.props.url,
            new_title: new_name,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            this.setState({changed: true, changedName: new_name})
        })
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
        const {changed, changedName} = this.state;
        return (
            <React.Fragment>
                <CssBaseline/>
                    <EditField
                        isOpen={this.state.changeNameFormOpen}
                        originalMessage={name}
                        closeEditMessageClick={this.closeChangeForm}
                        onSubmitQuestionEdit={this.onSubmitQuestionEdit}
                        give={2}
                    />
                    <Grid item sm={6} md={4} lg={3}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={changed ? changedName : name}
                                titleTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                                action={
                                    <IconButton
                                        onClick={this.openSettings}
                                        className={classes.settingButton}>
                                          <SettingsIcon fontSize="default"/>
                                    </IconButton>
                                }
                            />

                            <Menu
                                anchorEl={this.state.anchorEl}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.removeClass}>Remove Class</MenuItem>
                                {permission === 3 ?
                                    <MenuItem onClick={this.openChangeForm}>Change Chat Name </MenuItem>
                                    :
                                    null
                                }

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
                                      onClick={() => history.push(routes.CHATROOM + "?url=" + url, {url: url, permission: permission})}
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
