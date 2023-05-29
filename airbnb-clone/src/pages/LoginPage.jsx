import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser}=useContext(UserContext)
  async function handleLoginSubmit(e){
    e.preventDefault()
    try {
      const {data}=await axios.post('/login',{email,password})
      setUser(data)
      alert('Login succesful')
      setRedirect(true)
    } catch (error) {
      alert('Login failed')
    }
    
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div className="mt-4 grow flex items-center justify-center ">
      <div className="mb-64">
        <h1 className="text-4xl text-center font-medium">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type={"email"} placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type={"password"} placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="primary">Login</button>
        </form>
        <div className="text-center py-2 text-gray-500">
            Don't have an account yet?<Link to={'/register'} className="font-medium text-black pl-1 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
