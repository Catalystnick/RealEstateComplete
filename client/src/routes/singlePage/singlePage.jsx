import React, { useContext, useState } from "react";
import "./singlePage.scss";
import Slider from "../../components/slider/slider";
import { singlePostData, userData } from "../../lib/dummydata";
import { RiMapPin2Line } from "react-icons/ri";
import Map from "../../components/map/map";
import DOMPurify from "dompurify";

import {
  IoBookmarksOutline,
  IoChatboxOutline,
  IoResizeOutline,
  IoBedOutline,
  IoRestaurant,
} from "react-icons/io5";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { MdOutlinePets } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaRegBuilding } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { GiShower } from "react-icons/gi";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    navigate("/login");
  }
  console.log(post);

  async function handleSavePost() {
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  }
  return (
    <div className="singlePage">
      <div className="details">
        <div className="detailsWrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <RiMapPin2Line size={24} />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || "/avatar.png"} alt="user image" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="featuresWrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <HiMiniWrenchScrewdriver size={24} />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <MdOutlinePets size={24} />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets allowed</p>
                ) : (
                  <p>Pets not allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <GiReceiveMoney size={24} strokeWidth={1} />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizeContainer">
            <div className="size">
              <IoResizeOutline size={24} strokeWidth={1} />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <IoBedOutline size={24} strokeWidth={1} />
              <span>{post.bedroom} bedroom(s)</span>
            </div>
            <div className="size">
              <GiShower size={24} strokeWidth={1} />
              <span>{post.bathroom} bathroom(s)</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <FaRegBuilding size={24} strokeWidth={1} />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <FaBusSimple size={24} strokeWidth={1} />
              <div className="featureText">
                <span>Bus stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <IoRestaurant size={24} strokeWidth={1} />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            {/*disable save and chat buttons if current user doesnt exist */}
            <button
              onClick={handleSavePost}
              disabled={!currentUser}
              style={{
                backgroundColor: saved ? "teal" : "",
                color: saved ? "white" : "",
              }}
            >
              <IoBookmarksOutline size={24} />
              {saved ? "Place Saved" : "Bookmark"}
            </button>
            <button disabled={!currentUser}>
              <IoChatboxOutline size={24} />
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
