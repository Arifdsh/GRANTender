import '../cards/cards.scss'
import Car from '../../assets/image/car.jpg'
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

  )
}

export default Cards