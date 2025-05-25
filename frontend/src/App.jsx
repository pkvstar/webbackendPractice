import React from 'react'
import { useEffect } from 'react'

const App = () => {
  async function fetchData(){
    const response = await fetch("http://localhost:5000/user/1");
    const data = await response.json();
    console.log(data);
  } 
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div>App</div>
  )
}

export default App