import React, { useState } from 'react'
import './profile.scss'
import CreateTender from '../../components/createTender/CreateTender'
import Navbar from '../../components/navbar/Navbar.jsx'
import DarkLightMode from "../../components/navbar/DarkLightMode.jsx";
const Profile = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [showCreateTender, setShowCreateTender] = useState(false)

  const handleTabClick = (index) => {
    setActiveTab(index)
  }

  const handleNavigate = () => {
    setShowCreateTender(true)
  }

  const handleCancel = () => {
    setShowCreateTender(false)
  }

  return (
    <>
      <Navbar />
<DarkLightMode />

      <div className='profile-area'>
        <div className='profile-information-box'>
          <div className='profile-decoration-top'>
            <div className='profile-img'>
              <img src="src/assets/image/car.jpg" alt="car" />
            </div>
          </div>
          <div className='profile-name-box'>
            <p className='profile-name'>Ad Soyad</p>
          </div>
          <div className='profile-notification-box'>
            <ul>
              <li>Müraciət edənlər: <span>0</span></li>
              <li>Yaradan tenderler: <span>0</span></li>
              <li>Sorğu: <span>0</span></li>
            </ul>
          </div>
          <div className='profile-edit-box'>
            <button className='profile-edit-btn'>Edit</button>
          </div>
        </div>
        {!showCreateTender ? (
          <div className='profile-control-box'>
            <ul className='profile-tabs'>
              <li className={`profile-tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Tab 1</li>
              <li className={`profile-tab ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>Tab 2</li>
              <li className={`profile-tab ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>Tab 3</li>
              <button className='profile-add-tender' onClick={handleNavigate}>Tender əlavə et</button>
            </ul>
            <div className='profile-content-tabs'>
              <div className={activeTab === 1 ? 'profile-active-content' : 'profile-content'}>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae explicabo sint, autem quisquam alias accusamus tenetur eos velit porro cumque.</p>
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