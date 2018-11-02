import React, {Component} from 'react';
import {Question} from './Question'

export class QuestionList extends Component {
    render() {
        const {questions} = this.props;
        // TODO: const newQ = _.sortBy(questions, ['upvotes']);
        return (
            <div>
                {questions.map(question =>
                    <Question question={question.text}/>
                )}
            </div>
        );
    }
}
