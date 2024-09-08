import '../cards/cards.scss'
import Car from '../../assets/image/car.jpg'
function Cards() {
  return (
    <div className="cardsContainer">
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight">
          <h1>Elan Sahibi:<span>Nurlan Holding</span></h1>
          <h1>Elanın predmeti: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad?</span></h1>
          <h1>Elanın yaradılış tarixi: <span className='createSpans'>03/07/2024</span></h1>
          <h1>Elanın bitmə tarixi: <span className='createSpans' >15/12/2024</span></h1>
          <button>Ətraflı</button>
          <button className='editTender'>Sil</button>
          <button className='editTender'>Düzəliş et</button>

        </div>
      </div>
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight">
          <h1>Elan Sahibi:<span>Nurlan Holding</span></h1>
          <h1>Elanın predmeti: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad?</span></h1>
          <h1>Elanın yaradılış tarixi: <span className='createSpans'>03/07/2024</span></h1>
          <h1>Elanın bitmə tarixi: <span className='createSpans' >15/12/2024</span></h1>
          <button>Ətraflı</button>
        </div>
      </div>
      <div className="cardsItem">
        <div className="itemLeft">
          <img src={Car} alt="" />
        </div>
        <div className="itemRight">
          <h1>Elan Sahibi:<span>Nurlan Holding</span></h1>
          <h1>Elanın predmeti: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad?</span></h1>
          <h1>Elanın yaradılış tarixi: <span className='createSpans'>03/07/2024</span></h1>
          <h1>Elanın bitmə tarixi: <span className='createSpans' >15/12/2024</span></h1>
          <button>Ətraflı</button>
        </div>
      </div>
      </div>

  )
}

export default Cards