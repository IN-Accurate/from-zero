"use client"

import {useState} from "react"

export default function Home(){
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const APIrequestToServer = async()=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(input)){
      alert("Enter valid email address");
      return;
    }
    const res = await fetch("http://localhost:5000/api/input",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({value:input}),
    });
    const data = await res.json();
    setResponse(data.value)
  }
  return (<main className="p-10">
    <h1 className="text-2xl font-bold mb-4">
      FROM ZERO - Day 1
    </h1>
    <input 
      type="text"
      placeholder="Enter the email for subscribing"
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      className="border p-2 mr-2"
    />
    <button
      onClick={APIrequestToServer}
      className="bg-black text-white px-4 py-2"
    >
    Send
    </button>
    <div className="mt-4">
      <p>Response from backend:&nbsp;</p>
      <strong>{response}</strong>
    </div>
  </main>
  );
}