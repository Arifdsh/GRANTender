import { useState, useEffect, useMemo } from "react";
import "../cards/cards.scss";
import { FaBookmark, FaRegBookmark, FaCalendarCheck } from "react-icons/fa";
import { FaCalendarXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTender, fetchTenders, setTenderToEdit, showCreateTenderForm } from "../../features/tendersSlice";
import { toggleBookmark } from '../../features/usersSlice.js'

function Cards({ userId, filterType }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const tenders = useSelector((state) => state.tenders.tenders)
  const searchFilters = useSelector((state) => state.search)

  const filteredTenders = useMemo(() => {
    let result = tenders;

    if (filterType === "all") {
      if (searchFilters.city) {
        result = result.filter((tender) => tender.city === searchFilters.city);
      }
      if (searchFilters.all) {
        result = result.filter(
          (tender) =>
            tender.subject.toLowerCase().includes(searchFilters.all.toLowerCase()) ||
            tender.owner.toLowerCase().includes(searchFilters.all.toLowerCase())
        );
      }
      if (searchFilters.minPrice) {
        result = result.filter((tender) => tender.price >= searchFilters.minPrice);
      }
      if (searchFilters.maxPrice) {
        result = result.filter((tender) => tender.price <= searchFilters.maxPrice);
      }
      if (searchFilters.startDate) {
        result = result.filter((tender) => tender.creationDate >= searchFilters.startDate);
      }
      if (searchFilters.endDate) {
        result = result.filter((tender) => tender.expirationDate <= searchFilters.endDate);
      }
    }

    if (filterType === "created") {
      result = result.filter((tender) => tender.userId === userId);
    }

    if (filterType === "bookmarked") {
      result = result.filter((tender) => user.bookmarked.includes(tender.id));
    }

    return result;
  }, [tenders, userId, user?.bookmarked, searchFilters, filterType]);


  useEffect(() => {
    dispatch(fetchTenders());
  }, [dispatch]);


  const paginate = (items, currentPage, itemsPerPage) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const currentTenders = paginate(filteredTenders, currentPage, itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredTenders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleBookmarkClick = (id) => {
    dispatch(toggleBookmark({ tenderId: id, userId: user.id }));
  }


  const isBookmarked = (id) => {
    return user?.bookmarked?.includes(id)
  }

  const goToDetails = (id) => {
    navigate(`/detail/${id}`)
  }

  const handleDeleteClick = (id) => {
    dispatch(deleteTender(id))
  }

  const handleEditClick = (tender) => {
    dispatch(setTenderToEdit(tender))
    dispatch(showCreateTenderForm())
  }

  return (
    <div className="tenders" >
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
                <button onClick={() => handleEditClick(tender)} style={{ display: (filterType === "created" && userId) ? 'inline' : 'none' }} className="tenders-list__edit tenders-list__button">Düzəliş et</button>
                <button onClick={() => handleDeleteClick(tender.id)} style={{ display: (filterType === "created" && userId) ? 'inline' : 'none' }} className="tenders-list__delete tenders-list__button">Sil</button>
              </div>
            </div>
            <div onClick={() => handleBookmarkClick(tender.id)} className="tenders-list__save">
              {isBookmarked(tender.id) ? <FaBookmark className="saveIcon" /> : <FaRegBookmark className="saveIcon" />}
            </div>
          </li>
        ))}
      </ul>
      {pageNumbers.length > 1 && (
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={number === currentPage ? "active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cards;
