import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cards/cards.scss'
import Car from '../../assets/image/car.jpg'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function Cards() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTenders(response.data.cards);
        const initialBookmarks = {};
        response.data.cards.forEach(tender => {
          initialBookmarks[tender.id] = false;
        });
        setBookmarked(initialBookmarks);
      } catch (error) {
        console.error('Error fetching tenders:', error);
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
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="cardsContainer">
      {currentTenders.map(tender => (
        <div key={tender.id} className="cardsItem">
          <div className="itemLeft">
            <img src={Car} alt="Car" />
          </div>
          <div className="itemRight">
            <div className="about">
              <h1>
                Elan Sahibi: <span>{tender.owner.length > 150 ? `${tender.owner.slice(0, 150)}...` : tender.owner}</span>
              </h1>
              <h1>
                Elanın predmeti: <span>{tender.subject.length > 150 ? `${tender.subject.slice(0, 150)}...` : tender.subject}</span>
              </h1>
              <h1>
                Elanın yaradılış tarixi: <span className='createSpans'>{tender.creationDate}</span>
              </h1>
              <h1>
                Elanın bitmə tarixi: <span className='createSpans'>{tender.expirationDate}</span>
              </h1>
            </div>
            <div className='arrow'></div>
            <div className="editDelete">
              <button className='editDeleteButtons'>Sil</button>
              <button className='editDeleteButtons'>Düzəliş et</button>
              <button>Ətraflı</button>
            </div>
            <div>
              <div onClick={() => handleBookmarkClick(tender.id)} className='save'>
                {bookmarked[tender.id] ? <FaBookmark /> : <FaRegBookmark />}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="pagination">
        {pageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cards;
