import React, { useState } from 'react';
import '../cards/cards.scss'
import Car from '../../assets/image/car.jpg'
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

function Cards() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="cardsContainer">
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight">
          <div className="about">
            <h1>Elan Sahibi:<span>Nurlan Holding</span></h1>
            <h1>Elanın predmeti: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad?</span></h1>
            <h1>Elanın yaradılış tarixi: <span className='createSpans'>03/07/2024</span></h1>
            <h1>Elanın bitmə tarixi: <span className='createSpans' >15/12/2024</span></h1>
          </div>
          <div className='arrow'></div>
          <div className="editDelete">
            <button className='editDeleteButtons'>Sil</button>
            <button className='editDeleteButtons'>Düzəliş et</button>
            <button>Ətraflı</button>
          </div>
          <div>
            <div onClick={handleBookmarkClick} className='save'>
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </div>
          </div>
        </div>
      </div>
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight">
          <div className="about">
            <h1>Elan Sahibi:<span>Nurlan Holding</span></h1>
            <h1>Elanın predmeti: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad?</span></h1>
            <h1>Elanın yaradılış tarixi: <span className='createSpans'>03/07/2024</span></h1>
            <h1>Elanın bitmə tarixi: <span className='createSpans' >15/12/2024</span></h1>
          </div>
          <div className='arrow'></div>
          <div className="editDelete">
            <button className='editDeleteButtons'>Sil</button>
            <button className='editDeleteButtons'>Düzəliş et</button>
            <button>Ətraflı</button>
          </div>
          <div>
            <div onClick={handleBookmarkClick} className='save'>
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </div>
          </div>
        </div>
      </div>
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight">
          <div className="about">
            <h1>Elan Sahibi:<span>Nurlan Holding</span></h1>
            <h1>Elanın predmeti: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad?</span></h1>
            <h1>Elanın yaradılış tarixi: <span className='createSpans'>03/07/2024</span></h1>
            <h1>Elanın bitmə tarixi: <span className='createSpans' >15/12/2024</span></h1>
          </div>
          <div className='arrow'></div>
          <div className="editDelete">
            <button className='editDeleteButtons'>Sil</button>
            <button className='editDeleteButtons'>Düzəliş et</button>
            <button>Ətraflı</button>
          </div>
          <div>
            <div onClick={handleBookmarkClick} className='save'>
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards;
