import React from "react";
import queries from "../queries";
import {useMutation} from "@apollo/client";

const DeletePrompt = ({id}) => {

    const [deletePrompt, {loading, error}] = useMutation(
        queries.DELETE_PROMPT
    );

    const handleDelete = () => {
        deletePrompt({
            variables: {
                id
            }
        });
    }
    
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};