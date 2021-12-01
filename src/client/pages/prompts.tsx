import React from 'react'
import Link from "next/link";
const Prompts = () =>{

    const dummyList = [
    {id: 1, prompt: "Dummy Prompt 1", posted_by: "User1"}, 
    {id: 2, prompt: "Dummy Prompt 2", posted_by: "User1"}, 
    {id: 3, prompt: "Dummy Prompt 3", posted_by: "User2"}, 
    {id: 4, prompt: "Dummy Prompt 4", posted_by: "User3"}
    ]

    return (
        <div className="app">
            <h2>Prompts on this page</h2>
            <ul className="prompts">
        {dummyList.map((item, index) => (
        <li key={index}>
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