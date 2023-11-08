import React from "react";
import "../styles/carousal.scss";
export default React.memo(function Carousal() {
  return (
    <div className="carousel-container">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img
              src="https://source.unsplash.com/random/800×500/?burger"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="text-white fst-italic">
                I just want someone to look at me the way I look at food.
              </h2>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/800×500/?food"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="text-white fst-italic">
                Carbs are the answer. No matter the question.
              </h2>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/800×500/?pizza"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2 className="text-white fst-italic">
                OFF TO PIZZA, BE BACK NEVER
              </h2>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
})
