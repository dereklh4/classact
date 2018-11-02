import React, {Component} from 'react';

export class Answer extends Component {
    render() {
        const {answer} = this.props;
        return (
            <div>
                <li>{answer.answer} Upvotes: {answer.upvotes}</li>
            </div>
        );
    }
}
