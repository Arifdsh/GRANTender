import { useState, useEffect, useMemo } from "react";
import "../cards/cards.scss";
import { FaBookmark, FaRegBookmark, FaCalendarCheck } from "react-icons/fa";
import { FaCalendarXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTenders, selectAllTenders } from "../../features/tendersSlice";

function Cards({ userId }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [bookmarked, setBookmarked] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tenders = useSelector(selectAllTenders) || [];

  const userTenders = useMemo(() => {
    return userId ? tenders.filter((tender) => tender.userId === userId)  : tenders;

  }, [tenders, userId]);

  useEffect(() => {
    dispatch(fetchTenders())
  }, [dispatch]);



  useEffect(() => {
    const initialBookmarks = {};
    userTenders.forEach((tender) => {
      initialBookmarks[tender.id] = false;
    });
    setBookmarked(initialBookmarks);
  }, [userTenders]);

  const indexOfLastTender = currentPage * itemsPerPage;
  const indexOfFirstTender = indexOfLastTender - itemsPerPage;
  const currentTenders = userTenders.slice(indexOfFirstTender, indexOfLastTender);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userTenders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleBookmarkClick = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const goToDetails = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="tenders">
      <ul className="tenders-list">
        {currentTenders.map((tender) => (
          <li key={tender.id} className="tenders-list__item">
            <div className="tenders-list__photo">
              <img src={tender.imgUrl} alt="" />
            </div>
            <div className="tenders-list__information">
              <div className="tenders-list__owner">
                <h6 className="tenders-list__heading">Elan sahibi</h6>
                <p className="tenders-list__content">
                  {tender.owner.length > 150
                    ? `${tender.owner.slice(0, 150)}...`
                    : tender.owner}
                </p>
              </div>
              <div className="tenders-list__purpose">
                <h6 className="tenders-list__heading">Elanın predmeti</h6>
                <p className="tenders-list__content">
                  {tender.subject.length > 150
                    ? `${tender.subject.slice(0, 150)}...`
                    : tender.subject}
                </p>
              </div>
              <div className="tenders-list__activateTime">
                <div className="tenders-list__createTime">
                  <h6 className="tenders-list__heading">Elanın yaradılış tarixi</h6>
                  <p className="tenders-list__content">
                    <FaCalendarCheck className="calendar" />
                    {tender.creationDate}
                  </p>
                </div>
                <div className="tenders-list__expireTime">
                  <h6 className="tenders-list__heading">Elan bitmə tarixi</h6>
                  <p className="tenders-list__content">
                    <FaCalendarXmark className="calendar" />
                    {tender.expirationDate}
                  </p>
                </div>
              </div>
              <div className="tenders-list__actions">
                <button className="tenders-list__detail tenders-list__button" onClick={() => goToDetails(tender.id)}>
                  Ətraflı
                </button>
                <button style={{ display: userId ? 'inline' : 'none' }} className="tenders-list__edit tenders-list__button">Düzəliş et</button>
                <button style={{ display: userId ? 'inline' : 'none' }} className="tenders-list__delete tenders-list__button">Sil</button>
              </div>
            </div>
            <div onClick={() => handleBookmarkClick(tender.id)} className="tenders-list__save">
              {bookmarked[tender.id] ? <FaBookmark className="saveIcon" /> : <FaRegBookmark className="saveIcon" />}
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)} className={number === currentPage ? "active" : ""}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cards;
