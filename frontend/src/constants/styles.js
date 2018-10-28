
export const CA_STYLE = {
  width: '60px',
  marginRight: 8,
};

export const CARD_STYLE = theme => ({
    layout_tiles: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1400 + theme.spacing.unit * 3 * 2)]: {
            width: 1400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    submit: {
        marginTop: theme.spacing.unit,
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },

    },
    cardGrid: {
        padding: `${theme.spacing.unit * 2}px 0`,
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    cardHeader: {
        backgroundColor: theme.palette.grey[200],
    },
})
export const INTRO_STYLE = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        width: 70,
        height: 70,
        borderStyle: 'solid',
        boderWidth: 8,
        borderColor: '#3f51b5',
        backgroundColor: '#ffffff'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
    },
});
