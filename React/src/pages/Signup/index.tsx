import axios from "axios"
import { useState, type FormEvent } from "react"
import { IoIosMailUnread } from "react-icons/io";
import { AiOutlineEye } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import images from "../../Types/images";


function Login() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordLenErr, setPasswordLenErr] = useState(false)
  const [passwordDigitErr, setPasswordDigitErr] = useState(false)
  const [passwordSpecialErr, setPasswordSpecialErr] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isError, setIsError] = useState(false)

  const navigate = useNavigate()

  // create user
  const handleSignup = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/signup", { email, password })
      setEmail("")
      setPassword("")
      setMessage(`User created successfully || ${res.data.username}`)
      setIsError(false)
      setShowAlert(true)
      setTimeout(() =>{
        navigate("/signin")
       },1500)
    } catch (error: any) {
      setMessage(error.response?.data?.detail || error.message || "Signup failed")
      setIsError(true)
      setShowAlert(true)
    }
  }

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (passwordLenErr || passwordDigitErr || passwordSpecialErr) {
      setIsError(true)
      setShowAlert(true)
      return
    }
    handleSignup()
  }

  // password validation
  const validatePassword = (value: string) => {
    setPassword(value)
    setPasswordLenErr(value.length < 6)
    setPasswordDigitErr(!/[0-9]/.test(value))
    setPasswordSpecialErr(!/[!@#$%^&*]/.test(value))  

  }

  return (
    <div className="flex justify-center">
      <div className="sm:w-[500px] w-[290px] mt-[4rem] inset-shadow-sm shadow-lg p-3 rounded-lg">
        <div className="flex flex-row-reverse items-center justify-between">
          <p className="sm:text-4xl text-2xl font-medium text-active">SignUp</p>
          <div className="w-[120px]"> <img src={images.logo} alt="" className="w-full" /></div>
        </div>
        <form onSubmit={handleSubmit} className="py-3 flex flex-col">
          
          {/* Email */}
          <div className="flex flex-col my-3 relative">
            <label className="flex">
              <span>Email</span>
            </label>
            <input
              className={`pt-2 pb-2 pl-2 pr-10 border-2 rounded-lg focus:outline focus:outline-active focus:border-active 
                ${isError && !email ? "border-red-500" : "border-black/10"}`}
              type="email"
              value={email}
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <IoIosMailUnread className="text-active size-[1.5rem] sm:size-[2rem] absolute right-3 top-7" />
          </div>

          {/* Password */}
          <div className="flex flex-col my-3 relative">
            <label className="flex">
              <span>Password</span>
            </label>
            <input
              className={`pt-2 pb-2 pl-2 pr-10 border-2 rounded-lg focus:outline focus:outline-active 
                ${(passwordLenErr || passwordDigitErr || passwordSpecialErr) ? "border-red-500" : "border-black/10"}`}
              type="password"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              required
            />
            <AiOutlineEye className="text-active size-[1.5rem] sm:size-[2rem] absolute right-3 top-7" />
          </div>

          {/* Submit */}
          <div className="flex justify-between items-center">
            <button
                type="submit"
                disabled={passwordLenErr || passwordDigitErr || passwordSpecialErr || !email}
                className={`${
                    passwordLenErr || passwordDigitErr || passwordSpecialErr || !email
                    ? "bg-orange-200 cursor-not-allowed"
                    : "bg-active cursor-pointer"
                } text-sm sm:text-lg text-white font-medium py-2 px-4 rounded-lg`}
            >
              SignUp
            </button>
            <Link to="/signin" className="text-active"> Signin </Link>
          </div>
        </form>
      </div>

      {/* Alert */}
      {showAlert && (
        <div
          className={`w-[70%] absolute rounded-lg top-1 flex justify-between p-3 h-[50px] 
          ${isError ? "bg-red-500" : "bg-green-500"}`}
        >
          <p className="text-white">{message}</p>
          <IoCloseCircleSharp
            size={30}
            className="text-white cursor-pointer"
            onClick={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  )
}

export default Login
