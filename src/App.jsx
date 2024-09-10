import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Authorization from './pages/authorization/Authorization'
import Apply from './components/apply/Apply'
import Profile from './pages/profile/Profile'
import Footer from './components/footer/Footer'
const App=()=>{
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail" element={<Detail/>}/>
        <Route path="/authorization" element={<Authorization/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
    <Footer/>
    </>
  )
}

export default App
