import React, {Component} from 'react';
import {Question} from './Question'
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
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
        const {questions, classes, searchVal, permission, pinned} = this.props;
        const updatedQuestions = pinned ? questions.filter(question => question.pinned === true) : questions.filter(question => question.pinned === false)
        const filteredQuestions = updatedQuestions.filter(question => question.text.includes(searchVal))
        return (
            <div className={classNames(classes.questionContainer , {
                [classes.pinnedQuestionContainer]: pinned === true
            })}>
                {_.sortBy(filteredQuestions, ['year', 'month', 'day', 'hour', 'minute', 'second']).map(question =>
                    <Question
                        question={question.text}
                        id={question.id}
                        key={question.id}
                        upvotes={question.upvotes}
                        user={question.user}
                        upvotedByUser={question.upvoted_by_user}
                        savedByUser={question.saved_by_user}
                        answers= {question.responses}
                        currUser={this.state.currUser}
                        open={this.state.key === question.id}
                        setOpen={this.changeOpen}
                        permission={permission}
                        pinned={question.pinned}
                    />
                )}
                {(filteredQuestions.length === 0 && updatedQuestions.length !== 0) ? <div className={classes.sorry}>Sorry, no questions matched your search</div> : null}
            </div>
        );
    }
}

const QuestionList = withStyles(QUESTION_STYLE)(QuestionListBasic);
export {QuestionList}
