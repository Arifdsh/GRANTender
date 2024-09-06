import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import Authorization from './pages/authorization/Authorization'
import Apply from './pages/apply/Apply'
import Profile from './pages/profile/Profile'
import CreateTender from './pages/createTender/CreateTender'
import './styles/_global.scss'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createTender" element={<CreateTender />} />
      </Routes>
    </Router>
  )
}
export default App
