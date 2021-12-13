import React from 'react'
import Link from "next/link";
import { useQuery } from '@apollo/client';
import queries from '../queries';
const Prompts = () =>{

    const {loading, error, data} = useQuery(queries.GET_PROMPTS,{pollInterval: 4000});

    if(loading){
      return <div className="app">
          <h2>Loading Prompts</h2>
          </div>
    }
    return (
        <div className="app">
            <h2>Prompts on this page</h2>
            <ul className="prompts">
        {data && data.getPrompts.map((item, index) => (
        <li key={item.id}>
          <Link as={`/prompts/${item.id}`} href="/prompts/[promptId]">
            <a>
              {item.prompt}
            </a>
          </Link>
        </li>
      ))}
    </ul>

        </div>
    )
}

export default Prompts;