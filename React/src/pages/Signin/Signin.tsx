import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import images from '../../Types/images'

function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetch = async () => {
    if (!email || !password) {
      setMessage("Email and password are required")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const res = await axios.post("http://127.0.0.1:8000/signin", { email, password })
      
      setMessage(res.data.message || "Login successful")

      // clear inputs after success
      setEmail("")
      setPassword("")
      setTimeout(() =>{
        navigate("/home")
       },1500)
    } catch (error: any) {
      setError(error.response?.data?.detail || "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='pt-[4rem]'>
      <div className='pt-[2rem] flex flex-col gap-3 max-w-sm mx-auto shadow-lg p-3 inset-shadow-sm rounded-lg'>
        <div className='flex justify-between items-center'>
          <div className="w-[120px]"> <img src={images.logo} alt="" className="w-full" /></div>
          <p  className="sm:text-4xl text-2xl font-medium text-active">Sign In</p>
        </div>

        <input 
          type="email" 
          value={email}
          placeholder="example@gmail.com"
          onChange={e => setEmail(e.target.value)} 
          className='pt-2 pb-2 pl-2 pr-10 border-2 border-black/10 rounded-lg focus:outline focus:outline-active focus:border-active'
        />

        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          className='pt-2 pb-2 pl-2 pr-10 border-2 border-black/10 rounded-lg focus:outline focus:outline-active focus:border-active'
        />

        <button 
          onClick={fetch} 
          disabled={loading}
          className={` cursor-pointer p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-active hover:bg-orange-600'}`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <Link to ="/" className='text-active'>Signup</Link>

      </div>
      {error && (
          <p className=' rounded-lg bg-red-500 p-3 w-[60%] absolute top-2 text-sm text-center text-red-100'>{error}</p>
        )}

       {message && (
          <p className=' bg-green-500 p-3 w-[60%] absolute top-2 text-sm text-center text-green-100'>{message}</p>
        )}
    </div>
  )
}

export default Signin
