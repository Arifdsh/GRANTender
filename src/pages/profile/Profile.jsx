import React, { useState, useEffect } from 'react'
import './profile.scss'
import CreateTender from '../../components/createTender/CreateTender'
import Navbar from '../../components/navbar/Navbar.jsx'
import ProfileEdit from './profileEdit/ProfileEdit.jsx'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [showCreateTender, setShowCreateTender] = useState(false)
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  //const [profilePicture, setProfilePicture] = useState(null); // from local
  const [profile, setProfile] = useState({ name: '', picture: '' }); // holds name and picture from db.json

  const handleTabClick = (index) => setActiveTab(index)

  const handleNavigate = () => setShowCreateTender(true)

  const handleCancel = () => setShowCreateTender(false)

  const handleProfileEdit = () => setShowProfileEdit(true)

  const handleEditCancel = () => setShowProfileEdit(false)

  // useEffect(() => {
  //   // Retrieve the profile data (including picture) from localStorage
  //   const savedProfile = JSON.parse(localStorage.getItem('profile'));
  //   if (savedProfile && savedProfile.picture) {
  //     setProfilePicture(savedProfile.picture); // base64 image string
  //   }
  // }, []);

  useEffect(() => {
    // Fetch profile data from db.json (json-server)
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:5173/user'); // make sure the server is running
        const data = await response.json();
        if (data && data.length > 0) {
          setProfile({
            name: data[0].name,
            picture: data[0].picture, // Assuming picture is a URL or base64 encoded string
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchProfileData();
  }, []);


  return (
    <>
      <Navbar />
      <div className='profile-area'>
        <div className='profile-information-box'>
          <div className='profile-decoration-top'>
            <div className='profile-img'>
             {/* <img src="src/assets/image/car.jpg" alt="car" /> */}
             {/* <img src={profilePicture} alt="Profile" /> */}
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
            <button className='profile-edit-btn' onClick={handleProfileEdit}>Edit</button>
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