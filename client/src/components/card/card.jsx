import React from "react";
import { Link } from "react-router-dom";
import { RiMapPin2Line } from "react-icons/ri";
import {
  IoBedOutline,
  IoBookmarksOutline,
  IoChatboxOutline,
} from "react-icons/io5";
import { GiShower } from "react-icons/gi";
import "./card.scss";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={(item.images && item.images[0]) || ""} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <RiMapPin2Line size={20} />
          <span>{item.address}</span>
        </p>
        <p className="price">${item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <IoBedOutline size={30} />
              <span>{item.bedroom} bedroom(s)</span>
            </div>
            <div className="feature">
              <GiShower size={30} />
              <span>{item.bathroom} bathroom(s)</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <IoBookmarksOutline size={30} />
            </div>
            <div className="icon">
              <IoChatboxOutline size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
