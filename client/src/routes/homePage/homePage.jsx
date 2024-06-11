import React, { useContext } from "react";
import "./homePage.scss";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/authContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homepage">
      <div className="textContainer">
        <div className="textWrapper">
          <h1 className="title">
            Find you dream home for the best and most affordable prices
          </h1>
          <p className="description">
            At HomeEstate, we believe that finding your dream home or the
            perfect investment property should be an exciting and seamless
            experience. Whether you are a first-time homebuyer, a seasoned
            investor, or looking to sell, our platform is designed to meet all
            your real estate needs with ease and efficiency.
          </p>

          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Properties Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.jpeg" alt="bg" />
      </div>
    </div>
  );
}

export default HomePage;
