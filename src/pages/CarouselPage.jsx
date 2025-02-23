import React, { useEffect, useState, useRef } from "react";
import Carousel from "../components/Carousel";
import CarouselHeading from "../components/CarouselHeading";
const CarouselPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <div className="carousel-container">
      <CarouselHeading />
      <Carousel isVisible={isVisible} ref={componentRef} />
    </div>
  );
};

export default CarouselPage;
