import "../search/search.scss";
import { useState } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setFilters, resetFilters } from "../../features/searchSlice";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [all, setAll] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch()

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSearch = () =>{
    dispatch(
      setFilters({
        city,
        all,
        minPrice,
        maxPrice,
        startDate,
        endDate,
      })
    )
  }

  const handleReset = () => {
    dispatch(resetFilters());
    setCity("");
    setAll("");
    setMinPrice("");
    setMaxPrice("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
    <h1 className="tendersHeading" id="/cards.htm">TENDERLƏR</h1>
      <div className="searchContainer">
        <div className="filter">
          <div className="myInput">
            <input type="text" placeholder="Satınalma predmeti" value={all} onChange={(e) => setAll(e.target.value)} />
          </div>
          <div className="more" onClick={toggleModal}>
            <span>Filter</span>
            {isModalOpen ? (
              <VscChevronUp className="upDown" />
            ) : (
              <VscChevronDown className="upDown" />
            )}
          </div>
          <div className="buttons">
            <button onClick={handleSearch}>
              <IoIosSearch />
            </button>
            <button onClick={handleReset}>
              <FiRefreshCcw  />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="filterContainer">
          <div className="filterModal">
            <div className="cityAndPrice">
            <p>Şəhər:</p>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="" disabled>
                Seçim edin
              </option>
              <option value="Bakı">Bakı</option>
              <option value="Cəlilabad">Cəlilabad</option>
              <option value="Gəncə">Gəncə</option>
              <option value="Kürdəmir">Kürdəmir</option>
              <option value="Naxçıvan">Naxçıvan</option>
              <option value="Zaqatala">Zaqatala</option>
            </select>
            <p className="priceP">Qiymət:</p>
            <input
              className="price"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="price"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            </div>
            <div className="dates">
            <p className="dateP">Tarix:</p>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            </div>
            
          </div>
          <div className="close">
            <div className="close1">
              <button className="modalClose" onClick={toggleModal}>
                Bağla
              </button>
              <VscChevronUp className="upDown" onClick={toggleModal} />
            </div>
            <div className="close2">
              <button className="searchReset" onClick={resetFilters}>
                Axtarışı sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );    
}

export default Search;
