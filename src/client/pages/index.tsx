import React from 'react'
import Link from "next/link";
import NavBar from '../components/NavBar';
import ActivePrompt from './components/activePrompt';
import DisplaySubmission from './components/displaySub';

export default function Home() {
  let item = {id: 12, prompt: "songs thats play when you're on your last final", posted_by: "User3"}
  
  return (
    <div className= "app">
      <h2>Home Page</h2>
      <ActivePrompt data={item} />
      <DisplaySubmission data={item} />
      <br/>
    </div>
  )
}
