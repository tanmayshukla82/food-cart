import React, { useState } from "react";
import AddButton from "../components/AddButton";
// import { myContext } from "../context/main";
export default React.memo(function Card(props) {
  const fData = props.foodData;
  const [selectOption,setSelectOption] = useState("");
  // const {addedItem} = useContext(myContext);
  const handleSelectOption = (e)=>{
    setSelectOption(e.target.value);
  }
  return (
    <div className="col" key={fData._id}>
      <div className="card mb-3" key={fData._id} style={{ width: "18rem" }}>
        <img
          src={fData.img}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title ps-1">{fData.name}</h5>
          <div className="d-flex align-items-center justify-content-between pe-1 ps-1">
            <select
              className="form-select w-75"
              name="quantity"
              onChange={handleSelectOption}
              aria-label="Default select example"
            > <option value=''>Quantity</option>
              {Object.keys(fData.options[0]).map((key, index) => {
                return (
                  <option key={index} value={`${key}:${fData.options[0][key]}`}>
                    {key} : {fData.options[0][key]}
                  </option>
                );
              })}
            </select>
            <AddButton id={fData._id} quantity={selectOption} />
          </div>
        </div>
      </div>
    </div>
  );
});
