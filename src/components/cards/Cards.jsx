import '../cards/cards.scss'
import Car from '../../assets/image/car.jpg'
import { FaCalendarCheck } from "react-icons/fa"
import { FaCalendarXmark } from "react-icons/fa6"
function Cards() {
  return (
    <div className="cardsContainer">
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight"></div>
      </div>
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight"></div>
      </div>
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight"></div>
      </div>
      </div>

  //   <div className="tenders">
  //     <ul className="tenders-list">
  //       <li className="tenders-list__item">
  //         <div className="tenders-list__photo">
  //           <img src={Car} alt="" />
  //         </div>
  //         <div className="tenders-list__information">
  //           <div className="tenders-list__owner">
  //             <h6 className="tenders-list__heading"></h6>
  //             <p className="tenders-list__content"></p>
  //           </div>
  //           <div className="tenders-list__purpose">
  //             <h6 className="tenders-list__heading"></h6>
  //             <p className="tenders-list__content"></p>
  //           </div>
  //           <div className="tenders-list__activateTime">
  //             <div className="tenders-list__createTime">
  //               <h6 className="tenders-list__heading"><FaCalendarCheck className='calendar' />Yaranma vaxtı</h6>
  //               <p className="tenders-list__content">03/07/2023</p>
  //             </div>
  //             <div className="tenders-list__expireTime">
  //               <h6 className="tenders-list__heading"><FaCalendarXmark />Bitmə vaxtı</h6>
  //               <p className="tenders-list__content">03/09/2023</p>
  //             </div>
  //           </div>
  //           <div className="tenders-list__actions">
  //             <button className="tenders-list__detail">Ətrafli</button>
  //             <button className="tenders-list__edit">Düzəliş et</button>
  //             <button className="tenders-list__delete">Sil</button>
  //           </div>
  //         </div>
  //         <div className="tenders-list__save">Save</div>
  //       </li>
  //     </ul>
  //   </div>
  )
}

export default Cards