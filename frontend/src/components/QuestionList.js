import React, {Component} from 'react';
import {Question} from './Question'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class QuestionListBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
        };
    }

    componentWillMount() {
        const token = 'Token ' + localStorage.getItem('token')
        fetch('http://localhost:8000/api/auth/user/', {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(response => {
            this.setState({currUser: response.username});
        })
    }
    render() {
        const {questions, classes, upvoteThisMessage, postResponseHandler, handleDeleteMessage, handleEditMessage, handleDeleteResponse} = this.props;
        return (
            <div className={classes.questionContainer}>
                {questions.map(question =>
                    <Question
                        question={question.text}
                        id={question.id}
                        key={question.id}
                        upvotes={question.upvotes}
                        upvoteThisMessage={upvoteThisMessage}
                        upvotedByUser={question.upvoted_by_user}
                        postResponseHandler={postResponseHandler}
                        answers= {question.responses}
                        handleDeleteMessage={handleDeleteMessage}
                        handleDeleteResponse={handleDeleteResponse}
                        handleEditMessage={handleEditMessage}
                        currUser={this.state.currUser}
                        user={question.user}
                    />
                )}
            </div>
        );
    }
}

const QuestionList = withStyles(QUESTION_STYLE)(QuestionListBasic);
export {QuestionList}
