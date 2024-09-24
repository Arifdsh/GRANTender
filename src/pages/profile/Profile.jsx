import { useState, useEffect, useMemo, useCallback } from 'react'
import './profile.scss'
import CreateTender from '../../components/createTender/CreateTender'
import Navbar from '../../components/navbar/Navbar.jsx'
import ProfileEdit from './profileEdit/ProfileEdit.jsx'
import Cards from '../../components/cards/Cards.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { clearTenderToEdit, fetchTenders, hideCreateTenderForm, showCreateTenderForm } from '../../features/tendersSlice.js'
import { fetchUser, hideProfileEditForm, showProfileEditForm } from '../../features/usersSlice.js'
import { useLocation, useNavigate } from 'react-router-dom'
import ApplyCard from '../../components/applyCard/ApplyCard.jsx'
import { selectIncomingApplicationsCount } from '../../features/applySlice.js'

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()


  const showCreateTender = useSelector((state) => state.tenders.showCreateTender)
  const showProfileEdit = useSelector((state) => state.user.showProfileEdit);
  const loggedInUser = useSelector((state) => (state.user.user))
  const userCheck = localStorage.getItem('UserLoggedIn')

  const tenders = useSelector((state) => state.tenders.tenders)

  useEffect(() => {
    if (!userCheck || userCheck === 'false') {
      navigate('/authorization');
    } else {
      dispatch(fetchTenders())
      dispatch(fetchUser(loggedInUser?.id));


      if (!location.state?.openCreateTender) {
        dispatch(hideCreateTenderForm());
        dispatch(clearTenderToEdit());
      }
    }
  }, [dispatch, navigate, location.state]);

  const handleTabClick = useCallback((index) => {
    setActiveTab(index)
    dispatch(fetchTenders());
  }, [dispatch]);

  const handleNavigate = useCallback(() => {
    dispatch(showCreateTenderForm());
  }, [dispatch]);

  const handleProfileEdit = useCallback(() => {
    dispatch(hideCreateTenderForm());
    dispatch(showProfileEditForm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(hideProfileEditForm());
  }, [location.pathname, dispatch]);

  const createdTendersCount = useMemo(() => {
    return tenders.filter((tender) => tender.userId === loggedInUser?.id).length;
  }, [tenders, loggedInUser?.id]);

  const appliedTendersCount = useMemo(() => {
    return tenders.filter((tender) => loggedInUser?.applied?.includes(tender.id)).length;
  }, [tenders, loggedInUser?.applied]);


  const incomingApplicationsCount = useSelector(selectIncomingApplicationsCount);


  return (
    <>
      <Navbar />
      <div className='profile-area'>
        <div className='profile-information-box'>
          <div className='profile-decoration-top'>
            <div className="profile-img">
              {loggedInUser?.picture ? (
                <img src={loggedInUser.picture} alt="" />
              ) : (
                <span>{loggedInUser?.name[0]}</span>
              )}
            </div>
          </div>
          <div className='profile-name-box'>
            <p className='profile-name'>{loggedInUser?.name || 'Ad'}</p>
            <p className='profile-name'>{loggedInUser?.surname || 'Soyad'}</p>
          </div>
          <div className='profile-notification-box'>
            <ul>
              <li>Müraciət edənlər: <span>{appliedTendersCount}</span></li>
              <li>Yaradilan tenderlər: <span>{createdTendersCount}</span></li>
              <li>Sorğu: <span>{incomingApplicationsCount}</span></li>
            </ul>
          </div>
          <div className='profile-edit-box'>
            <button className='profile-edit-btn' onClick={handleProfileEdit}>Redaktə et</button>
          </div>
        </div>
        {showProfileEdit ? (
          <>
            <ProfileEdit />
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
                <Cards filterType="created" />
              </div>
              <div className={activeTab == 2 ? 'profile-active-content' : 'profile-content'}>
                <Cards filterType="applied" />
              </div>
              <div className={activeTab == 3 ? 'profile-active-content' : 'profile-content'}>
                <ApplyCard />
              </div>
              <div className={activeTab == 4 ? 'profile-active-content' : 'profile-content'}>
                <Cards filterType="bookmarked" />
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