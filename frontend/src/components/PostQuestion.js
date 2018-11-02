import React, {Component} from 'react';

export class PostQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Post Question Here',
        };
    }
    onSubmit = (event) => {
        alert('TODO: MAKE API CALL HERE A question was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <h2>Post a Question</h2>
                <form onSubmit={this.onSubmit}>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
