import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
const AnswerList = ({answers, classes}) =>
    <div>
        <ul>
            {answers.map(answer =>
                <li>
                    {answer.text}
                </li>
            )}
        </ul>
    </div>

export {AnswerList};
