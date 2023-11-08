import React, { useContext, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { myContext } from "../context/main";
export default function Signup() {
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(myContext); 
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async(event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/api/createUser',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            name : credential.name ,
            email  : credential.email,
            password : credential.password,
            location : credential.location
        })
    })
    const data = await response.json();
    if(data.success){
      setCurrentUser(data.userEmail);
    } 
    navigate('/');
  };
  const handleOnChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleAlreadyUser = ()=>{
    navigate('/login');
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={credential.email}
            onChange={handleOnChange}
            aria-describedby="emailHelp"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credential.password}
            onChange={handleOnChange}
            className="form-control"
            name="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={credential.name}
            onChange={handleOnChange}
            className="form-control"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
            type="text"
            value={credential.location}
            onChange={handleOnChange}
            className="form-control"
            name="location"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" onClick={handleAlreadyUser} className="btn btn-primary ms-3">
          Already a user?
        </button>
      </form>
    </>
  );
}
