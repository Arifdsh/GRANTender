import '../search/search.scss'
import { useState } from 'react';
import { VscChevronDown } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { VscChevronUp } from "react-icons/vsc";
function Search() {
    const [bool, setBool] = useState(false);
    function showMore(){
        setBool(!bool)
    }
  return (
    <>
        <div className="searchContainer">
            <div className="filter">
                <div className='myInput'>
                <input type="text" placeholder='Satınalma predmeti' />
                </div>
                <div className='more' onClick={showMore}>
                    <span>Ətraflı axtarış</span>
                   {bool ?<VscChevronUp className='upDown'/>  : <VscChevronDown className='upDown'/>} 
                    

                </div>
                <div className="buttons">
                    <button><IoIosSearch /></button>
                    <button><FiRefreshCcw /></button>
                </div>
            </div>

        </div>
    </>
  )
}

export default Search