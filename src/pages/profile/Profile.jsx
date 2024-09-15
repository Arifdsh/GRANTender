import React, { useState, useEffect } from 'react'
import './profile.scss'
import CreateTender from '../../components/createTender/CreateTender'
import Navbar from '../../components/navbar/Navbar.jsx'
import ProfileEdit from './profileEdit/ProfileEdit.jsx'
import Cards from '../../components/cards/Cards.jsx'
import { useDispatch } from 'react-redux'
import { fetchTenders } from '../../features/tendersSlice.js'
import DarkLightMode from '../../components/navbar/DarkLightMode.jsx'
import ScrollToTop from '../../components/scrolltotop/ScrollToTop.jsx'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [showCreateTender, setShowCreateTender] = useState(false)
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const [localUserId, setLocalUserId] = useState(null)
  const [profile, setProfile] = useState({ name: '', picture: ''})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTenders())
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    if (user) {
      setLocalUserId(user.id)
      setProfile({ name: user.name, picture: user.picture || '' })
    }
  }, [dispatch])

  const handleTabClick = (index) => setActiveTab(index)
  const handleNavigate = () => setShowCreateTender(true)
  const handleCancel = () => setShowCreateTender(false)
  const handleProfileEdit = () => setShowProfileEdit(true)
  const handleEditCancel = () => setShowProfileEdit(false)

  return (
    <>
      <Navbar />
      <DarkLightMode />
      <ScrollToTop />
      <div className='profile-area'>
        <div className='profile-information-box'>
          <div className='profile-decoration-top'>
            <div className='profile-img'>
              <img src={profile.picture} alt="" />
            </div>
          </div>
          <div className='profile-name-box'>
            <p className='profile-name'>{profile.name || 'Ad Soyad'}</p>
          </div>
          <div className='profile-notification-box'>
            <ul>
              <li>Müraciyet edənlər: <span>0</span></li>
              <li>Yaradan tenderler: <span>0</span></li>
              <li>Sorğu: <span>0</span></li>
            </ul>
          </div>
          <div className='profile-edit-box'>
            <button className='profile-edit-btn' onClick={handleProfileEdit}>Redaktə et</button>
          </div>
        </div>

        {showProfileEdit ? (
          <>
            <ProfileEdit />
            <button onClick={handleEditCancel} className='profile-cancel-btn'>X</button>
          </>
        ) : !showCreateTender ? (
          <div className='profile-control-box'>
            <ul className='profile-tabs'>
              <li className={`profile-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Mənim tenderlərim</li>
              <li className={`profile-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>Müraciət etdiklərim</li>
              <li className={`profile-tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>Gələn müraciətlər </li>
              <li className={`profile-tab ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>İzlədiklərim</li>
              <button className='profile-add-tender' onClick={handleNavigate}>Tender əlavə et</button>
            </ul>
            <div className='profile-content-tabs'>
              <div className={activeTab === 1 ? 'profile-active-content' : 'profile-content'}>
                <Cards userId={localUserId} />
              </div>
              <div className={activeTab === 2 ? 'profile-active-content' : 'profile-content'}>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, ullam?</p>
              </div>
              <div className={activeTab === 3 ? 'profile-active-content' : 'profile-content'}>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis asperiores, sit illo ipsa fugiat facilis.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <CreateTender />
            <button onClick={handleCancel} className='profile-cancel-btn'>X</button>
          </>
        )}
      </div>
    </>
  )
}

export default Profile