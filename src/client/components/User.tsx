import queries from "../queries";
import { useQuery } from "@apollo/client";
import React from "react";
import Link from "next/link";


const User = (props) =>{

    const {loading, error, data} = useQuery(queries.GET_USER, {variables: {id:props.userId}, pollInterval: 10000})

    if (loading) {
        return <li>Loading user</li>
    }

    if(data && data.getUserById){
        return(
            <Link href={`/users/${data.getUserById.id}`} passHref>
            <p>{data.getUserById.username}</p>
            </Link>
        )
    }
}

export default User; 