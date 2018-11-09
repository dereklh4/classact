import React from 'react';

const Upvotes = ({numUpvotes, upvoteThisMessage, id}) =>
    <div>
        <button onClick={() => upvoteThisMessage(id)}>{numUpvotes}</button>
    </div>

export default Upvotes
