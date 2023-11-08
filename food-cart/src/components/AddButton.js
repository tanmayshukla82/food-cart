import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { myContext } from "../context/main";
import { useNavigate } from 'react-router-dom';
export default React.memo(function AddButton({id,quantity}) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState('');
  useEffect(()=>
    setAuthToken(localStorage.getItem('authToken')||'')
  ,[])
  const { itemCount, setItemCount, setAddedItem, addedItem } =
    useContext(myContext);
  const handleIncrement = (id) => {
    if(authToken.length === 0){
      navigate('/signup');
    }else
    {
      if (quantity.length === 0) {
        alert("Kindly select the quantity");
      } else {
        setItemCount(itemCount + 1);
        setAddedItem((addedItem) => {
          if (
            addedItem.find(
              (item) => item.id === id && item.quantity === quantity
            ) == null
          ) {
            return [...addedItem, { id: id, quantity: quantity, count: 1 }];
          } else {
            return addedItem.map((item) => {
              if (item.id === id && item.quantity === quantity)
                return { ...item, count: item.count + 1 };
              else return item;
            });
          }
        });
      }
    }
  };
  const handleDecrement = (id) => {
    setItemCount(itemCount - 1);
    setAddedItem((addedItem) => {
      if(addedItem.find(item=>item.id===id && item.quantity===quantity && item.count === 1)){
        const leftArray = addedItem.filter((item)=>item.id!==id);
        const array = addedItem.filter((item) => item.id === id && item.count>1);
        return [...leftArray,...array];
      }
      return addedItem.map((item)=>{
        if (item.count > 0 && item.id === id && item.quantity === quantity)
          return { ...item, count: item.count - 1 };
        else return item;
      })
    });
  };
  return (addedItem.find((item) => item.id === id && item.quantity===quantity) ==
    null)||addedItem.find((item) => item.id === id) ==
    null ? (
    <button
      type="button"
      class="btn btn-primary"
      onClick={() => handleIncrement(id)}
    >
      Add
    </button>
  ) : (
    <button type="button" class="btn btn-primary">
      <span onClick={() => handleIncrement(id)} style={{ paddingRight: "1px" }}>
        +
      </span>
      <span>
        {quantity.length === 0
          ? addedItem
              .filter((item) => item.id === id)
              .reduce((total, current) => {
                return total + current.count;
              }, 0)
          : addedItem.find(
              (item) => item.id === id && item.quantity === quantity
            ) != null &&
            addedItem.find(
              (item) => item.id === id && item.quantity === quantity
            ).count}
      </span>
      <span onClick={() => handleDecrement(id)} style={{ paddingLeft: "1px" }}>
        -
      </span>
    </button>
  );
})
