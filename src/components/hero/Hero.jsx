import './hero.scss'
import tenderPhoto from '../../assets/image/tenderphoto2.png'

const Hero = () => {
    
    
    return (
        <section className='hero'>
            <div className="container">
                <h1 className="hero__content">Biznesinizi böyüdün: Tender tapın və <span
                    id="js-rotating"></span>
                </h1>
                <div className="hero__photo"><img src={tenderPhoto} alt="" /></div>
            </div>
        </section>
    )
}

export default Hero