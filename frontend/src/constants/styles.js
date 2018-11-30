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
});

export const CA_STYLE_HOME = {
    width: '150px',
  };
  export const CA_STYLE_CHATROOM = {
      width: '110px',
    };

export const HOME_STYLE = theme => ({
    homeIntro: {
        borderBottom: '2px solid #3f51b5',
    },
    paperRoot: {
        ...theme.mixins.gutters(),
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#2196f3',


    },
    words: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        width: '100%'
    },
    buttons: {
        width: '100%',
    },
    chatroomText: {
        fontSize: 100,
        color: 'white',
        lineHeight: '90%',
        fontWeight: 'bold',
        paddingLeft: theme.spacing.unit * 10
    },
    homeText: {
        fontSize: 100,
        lineHeight: '90%',
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: theme.spacing.unit * 50
    },
    avatar: {
        margin: '8px 90px 8px 70px',
        width: 160,
        height: 160,
        borderStyle: 'solid',
        boderWidth: 8,
        borderColor: '#3f51b5',
        marginTop: theme.spacing.unit,
        backgroundColor: '#ffffff',
        paddingRight: 20
    },
    gridPaper: {
        ...theme.mixins.gutters(),
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
        padding: 4,
        overflowX: 'scroll',
        overflowY: 'hidden'
    },
    ownerText: {
        paddingTop: 4,
        fontSize: 60
    }
})
export const QUESTION_STYLE = theme => ({
    chatName: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white'
    },
    sorry: {
        textAlign: 'center'
    },
    chatIntro: {
        borderBottom: '2px solid #3f51b5',
    },
    paperRoot: {
        ...theme.mixins.gutters(),
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2196f3',
    },

    avatar: {
        width: 120,
        height: 120,
        borderStyle: 'solid',
        boderWidth: 8,
        borderColor: '#3f51b5',
        marginTop: theme.spacing.unit,
        backgroundColor: '#ffffff',
        paddingRight: 20
    },
    questionContainer: {
        marginTop: 8,
        width: '100%',
        overflow: 'auto',
        maxHeight: 600,
    },
    sortByForm: {
      width: '25%',
      marginLeft: '75%',
      textAlign: 'right',
    },
    pinnedQuestionContainer: {
        maxHeight: 450
    },
    layout: {
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        marginTop:  theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
    },
    settingsAndRooms: {
        width: '20%',
        marginRight: theme.spacing.unit * 4,
                border: '1px solid #dfdfdf',
    },
    settingsText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#2196f3',
        padding: theme.spacing.unit * 2,
        marginBottom:  theme.spacing.unit * 2,
    },
    chatBoxes: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paper: {
        width: '47%',
        marginTop: 0 ,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit }px`
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
    submit1: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
        postion: 'absolute',
    },
    expansionPanel: {
        marginTop: 3,
        borderWidth: 2,
        borderColor: '#3f51b5',
        borderStyle: 'solid',
        marginBottom: 10
    },
    questionHeader: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        paddingTop: 13,
        paddingBottom: 15,
        paddingLeft: 15,
    },

    expanded: {
        '&$expanded': {
            minHeight: 0,
            marginTop: 0,
            marginBottom: 0,
        },
        borderBottomWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid',
        height: 30
    },
    expandIcon: {
        color: 'black',
    },
    upvoteButton: {
        padding: '0px!important',
        border: '1px solid #dfdfdf',
    },
    pinButton: {
        padding: '0px!important',
        border: '1px solid #dfdfdf',
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
        fontWeight: 'bold',
        width: '70%'
    },
    pinnedText: {
        borderRight: '2px solid #d4a338',
        borderBottom: '2px solid #d4a338',
    },
    questionSummaryText: {
        color: '#505050',
        fontWeight: 'bold',
        width: '70%'
    },
    questionInfoText: {
        borderLeft: '4px solid #3f51b5',
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
        padding: '3px!important',
    },
    deleteButton: {
        padding: '3px!important',
    },
    deleteResponseButton: {

    },
    threeVerticalDot: {
        marginRight: '0px',
        padding: '0px!important',
    },
    menuIcon: {
        padding: '3px!important',
    },
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
            width: 1350,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    settingButton: {
        padding: '0px!important',
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
      width: 325,
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
        height: '120px',
        width: '120px',
        marginLeft: '75px',
        marginRight: '70px',
        marginTop: '120px',
        marginBottom: '120px',
        color: 'white',
        '&:hover': {
            backgroundColor: '#2d46d1'
        },
    },
    addIcon: {
        height: '90px',
        width: '90px',
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
    linkText: {
        textDecoration: 'none'
    }
});

export const RESPONSE_STYLE = theme => ({
    topAnswerText: {
        width: '100%',
        padding: "10px 20px 10px 20px",
        borderBottom: '2px solid #dfdfdf',
        fontWeight: 'bold'
    },
    answerBox: {
        marginTop: theme.spacing.unit * 2,
        paddingLeft: 0
    },
    title: {
        textAlign: 'center',
        paddingRight: 25,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#3f51b5'
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
        width: '65%',
    },
    threeVerticalDot: {
        marginRight: '0px',
        padding: '0px!important',
    },
    menuIcon: {
        padding: '3px!important',
    },
})
