import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.scss"
import "../styles/cart.scss"
import { myContext } from "../context/main";
export default React.memo(function Navbar({searchBarActive,searchValue,setSearchValue}) {
  const [authToken, setAuthToken] = useState("");
  const { itemCount, addedItem, currentUser, setAddedItem, setItemCount} = useContext(myContext);
  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken") || "");
  }, []);
  const navigate = useNavigate();
  const handleLogOut = () => {
    if(addedItem.length > 0){
      const data = {
        items : itemCount,
        cartData : addedItem
      }
      localStorage.setItem(`${currentUser}`,JSON.stringify(data));
    }
    setAddedItem([]);
    setItemCount(0);
    localStorage.removeItem("authToken");
    setAuthToken("");
    navigate("/");
  };
  return (
    <div>
      <nav
        className="navbar fixed-top navbar-expand-lg navbar-dark shadow-5-strong"
        id="navbar"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            FoodCart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse w-100 d-flex">
            {authToken.length !== 0 ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="#">
                    Orders
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
            <div className="d-flex w-100 justify-content-end">
              <form className="d-flex w-25 justify-content-end align-items-center">
                {authToken.length === 0 ? (
                  <div>
                    <Link className="btn btn-outline-light" to="/login">
                      Login
                    </Link>
                    <Link className="btn btn-outline-light ms-2" to="/signup">
                      Signup
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link className="cart-container" to="/cart">
                      <div className="cart-count-style">
                        {
                          itemCount < 0 ? 0: itemCount
                        }
                      </div>
                      <i
                        className="fa-solid fa-cart-shopping fa-2xl cart"
                      ></i>
                    </Link>
                    <div
                      className="btn btn-outline-light"
                      onClick={handleLogOut}
                    >
                      Logout
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
})
