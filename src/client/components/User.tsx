import queries from "../queries";
import { useQuery } from "@apollo/client";


const User = (props) =>{

    const {loading, error, data} = useQuery(queries.GET_USER, {variables: {id:props.userId}, pollInterval: 10000})

    if (loading) {
        return <li>Loading user</li>
    }

    if(data && data.getUserById){
        return(
            <p>{data.getUserById.username}</p>
        )
    }
}

export default User; 