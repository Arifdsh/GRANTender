import React, { useEffect, useState } from 'react'
import './applyCard.scss'
import { FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTendersByCreator } from '../../features/tendersSlice';
import { fetchApplyListForTenders } from '../../features/applySlice';

const ApplyCard = () => {

    const dispatch = useDispatch()
    const applyData = useSelector((state) => state.apply.applyData)
    const tenders = useSelector((state) => state.tenders.tenders)
    const loggedInUser = useSelector((state) => state.user.user)

    const [activeIndex, setActiveIndex] = useState(null)


    useEffect(() => {
        if (loggedInUser) {
            dispatch(fetchTendersByCreator(loggedInUser?.id)); 
            console.log("Logged in User ID:", loggedInUser.id);
        }
    }, [dispatch, loggedInUser]);

    useEffect(() => {
        if (tenders?.length > 0) {
            dispatch(fetchApplyListForTenders(tenders.map(tender => tender.id))); 
            console.log("Tenders:", tenders);
        }
    }, [dispatch, tenders]);

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="appeal">
            <ul className="appeal-list">
                {
                applyData && applyData.length > 0 ? (
                    applyData.map((apply, index) => (
                        <li key={apply.id} className="appeal-list__item">
                            <div className="appeal-list__profile">
                                <div className="appeal-list__profile--box">
                                    <FaUserTie className='appeal-list__profile--icon' />
                                    <h6 className="appeal-list__profile--name">{apply.applicantName} </h6>
                                </div>
                                <p className="appeal-list__profile--tender">Tender adı: {apply.tenderOwnerName}</p>
                                <button onClick={() => toggleAccordion(index)} className="appeal-list__profile--detail">Ətraflı</button>
                            </div>
                            <div className={`appeal-list__information ${activeIndex === index ? 'activeAccordion' : ''}`}>
                                <div className="appeal-list__company">
                                    <h6 className="appeal-list__company--title">
                                        Müraciət edən adı
                                    </h6>
                                    <p className="appeal-list__content">{apply.name}</p>
                                    <h6 className="appeal-list__company--title">
                                        Komanda haqqında məlumat
                                    </h6>
                                    <p className="appeal-list__content">{apply.description}</p>
                                    <h6 className="appeal-list__company--title">
                                        Gördüyümüz işlər
                                    </h6>
                                    <p className="appeal-list__content">{apply.details} </p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No applications found</p>
                )
                }
            </ul>
        </div>
    )
}

export default ApplyCard