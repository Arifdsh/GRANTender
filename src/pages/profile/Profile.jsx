import { useState, useEffect } from 'react'
import './profile.scss'
import CreateTender from '../../components/createTender/CreateTender'
import Navbar from '../../components/navbar/Navbar.jsx'
import ProfileEdit from './profileEdit/ProfileEdit.jsx'
import Cards from '../../components/cards/Cards.jsx'
import { useDispatch, useSelector} from 'react-redux'
import { clearTenderToEdit, fetchTenders, hideCreateTenderForm, showCreateTenderForm } from '../../features/tendersSlice.js'
import { fetchUser } from '../../features/usersSlice.js'
import DarkLightMode from '../../components/navbar/DarkLightMode.jsx'
import { useLocation, useNavigate } from 'react-router-dom'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const [localUserId, setLocalUserId] = useState(null)
  const [profile, setProfile] = useState({ name: '', surname: '', picture: '' })

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const showCreateTender = useSelector((state)=>state.tenders.showCreateTender)
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))


  useEffect(() => {

    if (!loggedInUser) {
      navigate("/authorization")
      return
    }

    dispatch(fetchTenders())
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    if (user) {
      dispatch(fetchUser(user.id))
      setLocalUserId(user.id)
      setProfile({ name: user.name, surname: user.surname, picture: user.picture || '' })
    }

    if (!location.state || !location.state.openCreateTender) {
      dispatch(hideCreateTenderForm());
      dispatch(clearTenderToEdit())
    }

  }, [dispatch, location.state])

  const handleTabClick = (index) => setActiveTab(index)
  const handleNavigate = () => dispatch(showCreateTenderForm())
  const handleCancel = () => dispatch(hideCreateTenderForm())
  const handleProfileEdit = () => setShowProfileEdit(true)
  const handleEditCancel = () => setShowProfileEdit(false)

  return (
    <>
      <Navbar />
      <DarkLightMode />
      <div className='profile-area'>
        <div className='profile-information-box'>
          <div className='profile-decoration-top'>
            <div className='profile-img'>
              <img src={profile.picture} alt="" />
            </div>
          </div>
          <div className='profile-name-box'>
            <p className='profile-name'>{profile.name || 'Ad'}</p>
             <p className='profile-name'>{profile.surname || 'Soyad'}</p>
          </div>
          <div className='profile-notification-box'>
            <ul>
              <li>Müraciət edənlər: <span>0</span></li>
              <li>Yaradilan tenderlər: <span>0</span></li>
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
              <li className={`profile-tab ${activeTab == 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>Mənim tenderlərim</li>
              <li className={`profile-tab ${activeTab == 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>Müraciət etdiklərim</li>
              <li className={`profile-tab ${activeTab == 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)}>Gələn müraciətlər</li>
              <li className={`profile-tab ${activeTab == 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)}>İzlədiklərim</li>
              <button className='profile-add-tender' onClick={handleNavigate}>Tender əlavə et</button>
            </ul>
            <div className='profile-content-tabs'>
              <div className={activeTab == 1 ? 'profile-active-content' : 'profile-content'}>
                <Cards userId={localUserId} filterType="created" />
              </div>
              <div className={activeTab == 2 ? 'profile-active-content' : 'profile-content'}>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, ullam?</p>
              </div>
              <div className={activeTab == 3 ? 'profile-active-content' : 'profile-content'}>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis asperiores, sit illo ipsa fugiat facilis.</p>
              </div>
              <div className={activeTab == 4 ? 'profile-active-content' : 'profile-content'}>
                <Cards userId={localUserId} filterType="bookmarked"/>
              </div>
            </div>
          </div>
        ) : (
          <>
            <CreateTender />
          </>
        )}
      </div>
    </>
  )
}

export default Profile