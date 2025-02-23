import React, { useRef, useEffect } from "react";

const Herodetails = ({
  onHandleClick,
  nextActiveIndex,
  images,
  activeIndex,
  isVisible,
}) => {
  const animationRef = useRef(null);
  const animationClass = "progress";

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [images]);

  const onThisClick = () => {
    onHandleClick();
    const nextImageContainer = animationRef.current;
    if (nextImageContainer && isVisible) {
      nextImageContainer.style.animation = "none";
      nextImageContainer.offsetHeight;
      nextImageContainer.style.animation = `${animationClass} 4s linear infinite forwards`;
    }
  };

  return (
    <>
      <div className="hero-title-container">
        <p className="title-small">Welcome to TenTwenty Farms</p>
        <h1 className="hero-title">From Our Farms</h1>
        <h2 className="hero-title">To Your Hands</h2>
      </div>
      <div className="hero-next-container">
        <div className="next-image-container progress" ref={animationRef}>
          {images.map((image, index) => (
            <div
              key={index}
              onClick={onThisClick}
              className={`next-image ${
                index === nextActiveIndex
                  ? "next-active"
                  : index === activeIndex
                  ? "next-previous"
                  : ""
              }`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
          <span onClick={onHandleClick} className="next-span">
            Next
          </span>
        </div>
        <div className="page-container">
          <div className="slide-num">
            <p>
              0{(activeIndex % images.length) + 1}{" "}
              <span className="my-class">
                {" "}
                &#x2015;&#x2015;&#x2015;&#x2015;{" "}
              </span>{" "}
              03
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Herodetails;
