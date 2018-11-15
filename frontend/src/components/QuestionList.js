import React, {Component} from 'react';
import {Question} from './Question'
import withStyles from '@material-ui/core/styles/withStyles';
import {QUESTION_STYLE} from '../constants/styles';

class QuestionListBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
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
          this.setState({currentUser: response.username});
      })
    }

    render() {
        const {questions, classes, upvoteThisMessage, unUpvoteThisMessage} = this.props;
        // TODO: const newQ = _.sortBy(questions, ['upvotes']);
        return (
            <div className={classes.questionContainer}>
                {questions.map(question =>
                    <Question
                        question={question.text}
                        id={question.id}
                        key={question.id}
                        upvotes={question.upvotes}
                        user={question.user}
                        upvoteThisMessage={upvoteThisMessage}
                        unUpvoteThisMessage={unUpvoteThisMessage}
                        upvotedByUser={question.upvoted_by_user}
                        currentUser={this.state.currentUser}
                    />
                )}
            </div>
        );
    }
}

const QuestionList = withStyles(QUESTION_STYLE)(QuestionListBasic);
export {QuestionList}
