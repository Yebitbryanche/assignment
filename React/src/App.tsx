
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Signup'
import Home from './pages/home'
import Navbar from './Containers/nav'
import Footer from './Containers/footer'
import { footerLinks } from './Types/footer'
import About from './pages/about'
import Signin from './pages/Signin/Signin'
import Dashboard from './pages/Landing'

function App() {
  const data = [
    {
      title:"Home",
      path:"/home"
    },
     {
      title:"Recipe",
      path:"/recipe"
    },
     {
      title:"Blog",
      path:"/blog"
    },
     {
      title:"Contact",
      path:"/contact"
    },
      {
      title:"About Us",
      path:"/about"
    },
    {
      title:"Dashboard",
      path:"/landing"
    },
  ]
  return (
    <BrowserRouter>
    <Navbar items={data}/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/landing" element={<Dashboard/>}/>
    </Routes>
    <Footer items={footerLinks}/>
    </BrowserRouter>
  )
}

export default App
