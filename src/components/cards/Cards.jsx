import { useState, useEffect } from "react";
import axios from "axios";
import "../cards/cards.scss";
import Car from "../../assets/image/car.jpg";
import { FaBookmark, FaRegBookmark, FaCalendarCheck } from "react-icons/fa";
import { FaCalendarXmark } from "react-icons/fa6";
function Cards() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTenders(response.data.cards);
        const initialBookmarks = {};
        response.data.cards.forEach((tender) => {
          initialBookmarks[tender.id] = false;
        });
        setBookmarked(initialBookmarks);
      } catch (error) {
        console.error("Error fetching tenders:", error);
      }
    };

    fetchTenders();
  }, [apiUrl]);

  const indexOfLastTender = currentPage * itemsPerPage;
  const indexOfFirstTender = indexOfLastTender - itemsPerPage;
  const currentTenders = tenders.slice(indexOfFirstTender, indexOfLastTender);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tenders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleBookmarkClick = (id) => {
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="tenders">
      <ul className="tenders-list">
        {currentTenders.map((tender) => (
          <li key={tender.id} className="tenders-list__item">
            <div className="tenders-list__photo">
              <img src={Car} alt="" />
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
                  <h6 className="tenders-list__heading">
                    Elanın yaradılış tarixi
                  </h6>
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
                <button className="tenders-list__detail tenders-list__button">
                  Ətraflı
                </button>
                <button className="tenders-list__edit tenders-list__button">
                  Düzəliş et
                </button>
                <button className="tenders-list__delete tenders-list__button">
                  Sil
                </button>
              </div>
            </div>
            <div
              onClick={() => handleBookmarkClick(tender.id)}
              className="tenders-list__save"
            >
              {bookmarked[tender.id] ? (
                <FaBookmark className="saveIcon" />
              ) : (
                <FaRegBookmark className="saveIcon" />
              )}
            </div>
          </li>
        ))}
      </ul>
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
    </div>
  );
}

export default Cards;
