import {React,useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Carousal from './Carousal'
import Card from '../components/Card'

export default function Home() {
  const [scrollData, setScrollData] = useState(0);
  const [foodData, setFoodData] = useState([]);
  const [foodCategory,setFoodCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleScroll = () => {
    setScrollData(window.scrollY);
  };
   useEffect(() => {
     window.addEventListener("scroll", handleScroll);
     handleScroll();
     if (scrollData >= 660) {
       document.getElementById("navbar").style.backgroundColor =
         "rgba(51,51,51,1)";
     } else {
       document.getElementById("navbar").style.backgroundColor = "transparent";
     }
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, [scrollData]);
  useEffect(()=>{
      const getData = async () => {
        const response = await fetch("http://localhost:4000/api/getFoodItem", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response) {
          alert("error in loading the data..");
          return;
        }
        const responseData = await response.json();
        setFoodData(responseData.foodData);
        setFoodCategory(responseData.foodCategory);
      }
      getData();
  },[])
  return (
    <div>
      <Navbar />
      <Carousal />
      <div className="container">
        <div className="w-100 d-flex justify-content-end">
          <form className="w-50 searchbar mt-5 mb-3 pe-2" role="search">
            <input
              className="form-control"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search the dish you want to have....."
              aria-label="Search"
            />
          </form>
        </div>
      {foodCategory.map((catagoryData) => {
        return (
          <>
            {searchValue.length === 0 && (
              <div className="ps-1 pe-2 border-bottom border-white mt-2 mb-5 fs-4 fst-italic">
                {catagoryData.CategoryName}
              </div>
            )}
            <div className="row row-cols-4">
              {foodData
                .filter(
                  (item) =>
                    item.CategoryName === catagoryData.CategoryName &&
                    item.name
                      .toLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                )
                .map((fData) => {
                  return (
                    <Card foodData={fData}/>
                  );
                })}
            </div>
          </>
        );
      })}
    </div>
    </div>
  );
}
