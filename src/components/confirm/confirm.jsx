import React from 'react';
import '../confirm/confirm.scss';
import { IoCloseSharp } from "react-icons/io5";
function confirm() {
  return (
    <div className='confirmContainer'>
        <div className="confirmMain">
            <div className="textClose">
                <h5>CONFİRMATİON</h5>
                <IoCloseSharp className='sharp' />
            </div>
            <div className="mainText">
                Silmək istədiyinizə əminsiniz mi?
            </div>
            <div className="btns">
                <button>Bəli</button>
                <button>Xeyr</button>
            </div>
        </div>
    </div>
  )
}

export default confirm