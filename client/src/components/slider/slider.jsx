import { useState } from "react";
import "./slider.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  function handleClick(direction) {
    if (imageIndex + direction > images.length - 1) {
      setImageIndex(0);
    }

    if (imageIndex + direction < 0) {
      setImageIndex(images.length - 1);
    }

    if (
      imageIndex + direction >= 0 &&
      imageIndex + direction <= images.length - 1
    ) {
      setImageIndex(imageIndex + direction);
    }
  }
  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="leftArrow">
            <FaArrowLeft className="Arrow" onClick={() => handleClick(-1)} />
          </div>
          <div className="imageContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="rightArrow">
            <FaArrowRight className="Arrow" onClick={() => handleClick(1)} />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImage">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
