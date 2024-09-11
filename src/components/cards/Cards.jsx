import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../cards/cards.scss'
import Car from '../../assets/image/car.jpg'
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
    <>
    </>

  )
}

export default Cards;
