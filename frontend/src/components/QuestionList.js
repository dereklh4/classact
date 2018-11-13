import React, {Component} from 'react';
import {Question} from './Question'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class QuestionListBasic extends Component {
    render() {
        const {questions, classes, upvoteThisMessage, postResponseHandler} = this.props;
        // TODO: const newQ = _.sortBy(questions, ['upvotes']);
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
                        answers= {question.answers}
                    />
                )}
            </div>
        );
    }
}

const QuestionList = withStyles(QUESTION_STYLE)(QuestionListBasic);
export {QuestionList}
