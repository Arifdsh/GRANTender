import React, { useEffect, useState } from 'react'
import './applyCard.scss'
import { FaChevronCircleDown, FaChevronCircleLeft, FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTendersByCreator } from '../../features/tendersSlice';
import { fetchApplyListForTenders } from '../../features/applySlice';
import NotResult from '../notResult/NotResult';

const ApplyCard = () => {

    const dispatch = useDispatch()
    const applyData = useSelector((state) => state.apply.applyData)
    const tenders = useSelector((state) => state.tenders.tenders)
    const loggedInUser = useSelector((state) => state.user.user)

    const [activeIndex, setActiveIndex] = useState(null)


    useEffect(() => {
        if (loggedInUser) {
            dispatch(fetchTendersByCreator(loggedInUser?.id)); 
        }
    }, [dispatch, loggedInUser]);

    useEffect(() => {
        if (tenders?.length > 0) {
            dispatch(fetchApplyListForTenders(tenders.map(tender => tender.id)));
        }
    }, [dispatch, tenders]);

    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const renderApplyFiles = (apply) => {
        if (apply?.file?.length > 0) {
          return apply.file.map((file, index) => {
            const fileUrl = file.base64;
      
            return (
              <div key={index} className="file-item">
                <p>{file.name} ({Math.round(file.size / 1024)} KB)</p>
                <a href={fileUrl} download={file.name} className="btn btn-primary">
                  Download {file.name}
                </a>
              </div>
            );
          });
        } else {
          return <p>No files attached to this application.</p>;
        }
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
                              {activeIndex == index ? 
                             <FaChevronCircleDown onClick={() => toggleAccordion(index)} className="appeal-list__profile--detail" /> : <FaChevronCircleLeft onClick={() => toggleAccordion(index)} className="appeal-list__profile--detail" />}
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
                                    <h6 className="appeal-list__company--title mt-3">Əlavə edilən fayllar</h6>
                                    {renderApplyFiles(apply)}                                    
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <NotResult/>
                )
                }
            </ul>
        </div>
    )
}

export default ApplyCard