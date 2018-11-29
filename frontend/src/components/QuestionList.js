import React, {Component} from 'react';
import {Question} from './Question'
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class QuestionListBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currUser: '',
            key: '',
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
    changeOpen = (key) => {
        this.setState({key: key})
    }
    render() {
        const {questions, classes, searchVal, permission} = this.props;
        const filteredQuestions = questions.filter(question => question.text.includes(searchVal))
        return (
            <div className={classes.questionContainer}>
                {_.sortBy(filteredQuestions, 'pinned').reverse().map(question =>
                    <Question
                        question={question.text}
                        id={question.id}
                        key={question.id}
                        upvotes={question.upvotes}
                        user={question.user}
                        upvotedByUser={question.upvoted_by_user}
                        answers= {question.responses}
                        currUser={this.state.currUser}
                        open={this.state.key === question.id}
                        setOpen={this.changeOpen}
                        permission={permission}
                        pinned={question.pinned}
                    />
                )}
                {(filteredQuestions.length === 0 && questions.length !== 0) ? <div className={classes.sorry}>Sorry, no questions matched your search</div> : null}
            </div>
        );
    }
}

const QuestionList = withStyles(QUESTION_STYLE)(QuestionListBasic);
export {QuestionList}
