export const EDIT_QUESTION_STYLE = theme => ({
    dialog: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: 200,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    submit: {
        marginTop: theme.spacing.unit,
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit
    },
    backButton: {
        padding: '0px!important',
        position: 'absolute',
        right: '0px',

    }
})
export const QUESTION_STYLE = theme => ({
    questionContainer: {
        marginTop: 10,
        width: '100%',
    },
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    postQuestion: {
        width: '100%',
        marginTop: theme.spacing.unit
    },
    submit: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
    },
    expansionPanel: {
        marginTop: 3,
        borderWidth: 2,
        borderColor: '#3f51b5',
        borderStyle: 'solid'
    },
    questionSummary: {
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid'
    },
    upvoteButton: {
        padding: '0px 3px 0px 0px'
    },

    upvotesText: {
        color: '#505050',
        fontWeight: 'bold',
        borderRight: '2px solid #dfdfdf',
        borderBottom: '2px solid #dfdfdf',
        paddingRight: 5,
        marginRight: 12,
        marginLeft: 10

    },
    questionSummaryText: {
        color: '#505050',
        fontWeight: 'bold'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
    },
    fullQuestionContainer: {
        borderBottom: '1px solid #dfdfdf',
        wordWrap: 'break-word',
    },
    fullQuestionText: {
        margin: '10px 15px 10px 15px'
    },
    editButton: {
        padding: '0px!important',
        position: 'absolute',
        right: '80px',
        border: '1px solid #dfdfdf',
    },
    editResponseButton: {
        right: '45px',
    },
    deleteButton: {
        padding: '0px!important',
        position: 'absolute',
        right: '45px',
        border: '1px solid #dfdfdf',
    },
    deleteResponseButton: {
        right: '10px',
    }
});
export const CA_STYLE = {
  width: '60px',
  marginRight: 8,
};

export const FORM_STYLE = theme => ({
    formTitle: {
        textAlign: 'center',
    },
    submit: {
        marginTop: theme.spacing.unit,
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit
    },
})
export const CARD_STYLE = theme => ({
    layout_tiles: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 5,
        [theme.breakpoints.up(1400 + theme.spacing.unit * 3 * 2)]: {
            width: 1400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    settingButton: {
        height: '5px',
        width: '35px',
        marginRight: '5px',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
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
    tileText: {
        borderWidth: 1,
        padding: '20px 0',
        margin: '5px 0',
        textAlign: 'center',
        fontSize: '17px',
        fontWeight: 'bold',
        borderColor: '#dfdfdf',
        borderStyle: 'solid'
    },
    link: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textDecoration: 'none'
    },
    addButton : {
        backgroundColor: '#3f51b5',
        height: '100px',
        width: '100px',
        marginLeft: '85px',
        marginTop: '120px',
        color: 'white',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
    },
    addIcon: {
        height: '80px',
        width: '80px',
    }
})
export const INTRO_STYLE = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
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
        width: '100%',
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

export const RESPONSE_STYLE = theme => ({
    answerBox: {
        marginTop: theme.spacing.unit * 2,
        paddingLeft: 0
    },
    title: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    list: {
        listStyleImage: 'url(../images/ListArrow.png)',
    },
    upvotesText: {
        color: '#505050',
        fontWeight: 'bold',
        borderRight: '2px solid #dfdfdf',
        borderBottom: '2px solid #dfdfdf',
        paddingRight: 5,
        marginRight: 12,
        marginLeft: 10

    },
    avatar: {
        backgroundColor: 'white'
    },
    image: {
        paddingBottom: 3
    },
    answerText: {
        paddingRight: 70
    }
})
