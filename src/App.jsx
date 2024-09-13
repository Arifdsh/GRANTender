import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Authorization from './pages/authorization/Authorization'
import Apply from './components/apply/Apply'
import Profile from './pages/profile/Profile'
import Footer from './components/footer/Footer'
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from './features/usersSlice.js';
import { useEffect } from 'react'
const App=()=>{

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is stored in localStorage
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      dispatch(setLoggedInUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

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
