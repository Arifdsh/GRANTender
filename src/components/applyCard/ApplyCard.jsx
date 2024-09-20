import React, { useState } from 'react'
import './applyCard.scss'
import { FaUserTie } from "react-icons/fa";
import { FaChevronCircleLeft, FaChevronCircleDown } from "react-icons/fa";
import { } from "react-icons/fa";
const ApplyCard = () => {

    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = () => {
        setIsActive((prevState) => !prevState);
    };
    return (
        <div className="appeal">
            <ul className="appeal-list">
                <li className="appeal-list__item">
                    <div className="appeal-list__profile">
                        <div className="appeal-list__profile--box">
                            <FaUserTie className='appeal-list__profile--icon' />
                            <h6 className="appeal-list__profile--name">Ali</h6>
                        </div>
                        <p className="appeal-list__profile--tender">Tender adı: Bina</p>
                        {!isActive ?
                            (<FaChevronCircleLeft onClick={toggleAccordion} className="appeal-list__profile--detail" />
                            )
                            : <FaChevronCircleDown onClick={toggleAccordion} className="appeal-list__profile--detail" />}
                    </div>
                    <div className={`appeal-list__information ${isActive ? "activeAccordion" : ""}`}>
                        <div className="appeal-list__company">
                            <h6 className="appeal-list__company--title">
                                Müraciət edən adı
                            </h6>
                            <p className="appeal-list__content">Lorem ipsum dolor sit amet.</p>
                            <h6 className="appeal-list__company--title">
                                Komanda haqqında məlumat
                            </h6>
                            <p className="appeal-list__content">Lorem ipsum dolor sit amet.</p>
                            <h6 className="appeal-list__company--title">
                                Gördüyümüz işlər
                            </h6>
                            <p className="appeal-list__content">Lorem ipsum dolor sit amet.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ApplyCard