import React from 'react';
import queries from '../queries';
import { useQuery, useMutation } from '@apollo/client';

const NewComment = (props) => {

    const [addComment, { data }] = useMutation(queries.ADD_COMMENT, {refetchQueries:[{query: queries.GET_PROMPT, variables: {promptId: props.promptId}}]});

    const [comment, setComment] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment({
            variables: {    
                promptId: props.promptId,
                comment
            }
        });
        props.refreshComments(true);
        setComment('');
        props.refreshComments(false);
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
