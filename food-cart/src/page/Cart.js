import React, { useContext,useEffect, useState } from 'react'
import { myContext } from '../context/main'
import AddButton from '../components/AddButton'
import "../styles/cart.scss"
export default React.memo(function Cart() {
  const {addedItem} = useContext(myContext);
  const [foodData, setFoodData] = useState([]);
  useEffect(() => {
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
    };
    getData();
  }, []);
  return (
    <>
      <div className='container cart-div-container p-3 d-flex flex-column'>
        <div className='d-flex justify-content-center'><h1>CART</h1></div>
        {
        addedItem.map((item)=>{
          return foodData.filter((data)=>data._id===item.id).map((filterData)=>{
            return (
              <div className="w-100 d-flex align-items-center justify-content-between mb-3">
                <div className="w-75 d-flex">
                  <img
                    src={filterData.img}
                    alt="..."
                    style={{
                      objectFit: "cover",
                      width: "200px",
                      marginRight: "10px",
                    }}
                  />
                  <div className="d-flex flex-column">
                    <h3>{filterData.name}</h3>
                    <h5>{filterData.CategoryName}</h5>
                    <p>{item.count} items</p>
                    <p>quantity : {item.quantity.split(":")[0].trim()}</p>
                    <p>
                      <i>Description : {filterData.description}</i>
                    </p>
                  </div>
                </div>
                <div className="w-25 d-flex flex-column justify-content-center align-items-center">
                  <div>
                    {<AddButton id={item.id} quantity={item.quantity} />}
                  </div>
                  <div className="mt-2">
                    Rs.{parseInt(item.count * item.quantity.split(":")[1])}
                  </div>
                </div>
              </div>
            );
          })
        })
      
        }
      </div>
    </>
  )
})
