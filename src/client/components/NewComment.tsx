import React from 'react';
import queries from '../queries';
import { useQuery, useMutation } from '@apollo/client';

const NewComment = ({ promptId }) => {

    const [addComment, { data }] = useMutation(queries.ADD_COMMENT);

    const [comment, setComment] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment({
            variables: {
                promptId,
                comment
            }
        });
        setComment('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button type="submit">Add Comment</button>
        </form>
    )
}

export default NewComment;
