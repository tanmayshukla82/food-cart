import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myContext } from "../context/main";
export default function Login() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const {setCurrentUser,currentUser,setAddedItem, setItemCount} = useContext(myContext);
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid Credential");
      return;
    }
    if (json.success) {
      setCurrentUser(credential.email);
      let data = localStorage.getItem(`${credential.email}`);
      if(data!=null){
      data = JSON.parse(data);
      setAddedItem(data.cartData.length>0 ? data.cartData : []);
      setItemCount(data.items);
      }
      localStorage.setItem("authToken", json.token);
      navigate("/");
    }
  };
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={credential.email}
            name="email"
            onChange={handleOnChange}
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credential.password}
            name="password"
            onChange={handleOnChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
