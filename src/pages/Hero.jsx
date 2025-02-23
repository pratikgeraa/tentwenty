import React, { useState, useEffect, useRef } from "react";
import Herodetails from "../components/Herodetails";
import Header from "../components/Header";
import hero1 from "../assets/hero1.jpeg";
import hero2 from "../assets/hero2.jpeg";
import hero3 from "../assets/hero3.png";
import "../styles/hero.css";

const Hero = () => {
  const images = [hero1, hero2, hero3];
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [nextActiveIndex, setNextActiveIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const imgPreload = () => {
      images.forEach((image) => {
        const img = new Image();
        img.src = image;
      });
    };
    imgPreload();

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when 50% of the component is in view
    });

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, [images]);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        goToNext();
        console.log(activeIndex);
      }, 4000);

      return () => clearInterval(interval); // Clear interval when not in view
    }
  }, [isVisible, activeIndex]);

  const goToNext = () => {
    setPreviousIndex(activeIndex % images.length);
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    setNextActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <div className="slider" ref={sliderRef}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`header-wrapper slide  ${
              index === activeIndex
                ? "active"
                : index === previousIndex
                ? "previous"
                : ""
            } `}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        <div className="content-wrapper">
          <Header />
          <Herodetails
            onHandleClick={goToNext}
            nextActiveIndex={nextActiveIndex}
            images={images}
            activeIndex={activeIndex}
            isVisible={isVisible}
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
