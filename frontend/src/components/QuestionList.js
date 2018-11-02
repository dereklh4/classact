import React, {Component} from 'react';
import {Question} from './Question'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class QuestionListBasic extends Component {
    render() {
        const {questions, classes} = this.props;
        // TODO: const newQ = _.sortBy(questions, ['upvotes']);
        return (
            <div label="yo" className={classes.questionContainer}>
                {questions.map(question =>
                    <Question question={question.text}/>
                )}
            </div>
        );
    }
}

const QuestionList = withStyles(QUESTION_STYLE)(QuestionListBasic);
export {QuestionList}
