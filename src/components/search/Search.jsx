import '../search/search.scss';
import { useState } from 'react';
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";

function Search() {
    const [bool, setBool] = useState(false);
    
    function showMore() {
        setBool(!bool);
    }

    return (
        <>
            <div className="searchContainer">
                <div className="filter">
                    <div className='myInput'>
                        <input type="text" placeholder='Satınalma predmeti' /> 
                    </div>
                    <div className='more' onClick={showMore}>
                        <span>Filter</span>
                        {bool ? <VscChevronUp className='upDown' /> : <VscChevronDown className='upDown' />}
                    </div>
                    <div className="buttons">
                        <button><IoIosSearch /></button>
                        <button><FiRefreshCcw /></button>
                    </div>
                </div>
            </div>
            {bool && (
                <div className="filterContainer">
                    <div className="filterModal">
                        <p>Şəhər seçin:</p>
                        <select name="" id="">
                            <option value="" selected disabled>Seçim edin</option>
                            <option value="">Bakı</option>
                            <option value="">Cəlilabad</option>
                            <option value="">Gəncə</option>
                            <option value="">Kürdəmir</option>
                            <option value="">Naxçıvan</option>
                            <option value="">Zaqatala</option>
                        </select>
                        <p>Qiymət:</p>
                        <input type="number" placeholder='Min' />
                        <input type="number" placeholder='Max' />
                        <div className="calendar">
                            <div className="month">
                                <button>&#8249;</button>
                                <h1>Sentyabr 2024</h1>
                                <button>&#8250;</button>
                            </div>
                            <div className="weekdays">
                                <div>B.e</div>
                                <div>Ç.a</div>
                                <div>Ç</div>
                                <div>C.a</div>
                                <div>C</div>
                                <div>Ş</div>
                                <div>B</div>
                            </div>
                            <div className="days">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                                <div>8</div>
                                <div>9</div>
                                <div>10</div>
                                <div>11</div>
                                <div>12</div>
                                <div>13</div>
                                <div>14</div>
                                <div>15</div>
                                <div>16</div>
                                <div>17</div>
                                <div>18</div>
                                <div>19</div>
                                <div>20</div>
                                <div>21</div>
                                <div className="current-day">22</div>
                                <div>23</div>
                                <div>24</div>
                                <div>25</div>
                                <div>26</div>
                                <div>27</div>
                                <div>28</div>
                                <div>29</div>
                                <div>30</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Search;