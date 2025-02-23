import React, { useEffect, useState } from "react";
import "../styles/carousel.css";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.png";
import c5 from "../assets/c5.png";
import c1Webp from "../assets/c1.webp";
import c2Webp from "../assets/c2.webp";
import c3Webp from "../assets/c3.webp";
import c4Webp from "../assets/c4.webp";
import c5Webp from "../assets/c5.webp";

const Carousel = React.forwardRef((props, ref) => {
  const images = [
    {
      image: c1,
      webp: c1Webp,
      title: "Client 1",
      desc: "Dubai, United Arab Emirates",
    },
    {
      image: c2,
      webp: c2Webp,
      title: "Client 2",
      desc: "Dubai, United Arab Emirates",
    },
    {
      image: c3,
      webp: c3Webp,
      title: "Client 3",
      desc: "Dubai, United Arab Emirates",
    },
    {
      image: c4,
      webp: c4Webp,
      title: "Client 4",
      desc: "Dubai, United Arab Emirates",
    },
    {
      image: c5,
      webp: c5Webp,
      title: "Client 5",
      desc: "Dubai, United Arab Emirates",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageError = (event, fallbackImage) => {
    event.target.src = fallbackImage;
  };

  useEffect(() => {
    let progress = 50;
    let startX = 0;
    let active = 0;
    let isDown = false;

    const speedDrag = -0.1;

    const getZindex = (array, index) =>
      array.map((_, i) =>
        index === i ? array.length : array.length - Math.abs(index - i)
      );

    const $items = document.querySelectorAll(".carousel-item");
    const $cursors = document.querySelectorAll(".cursor");

    function isMobileView() {
      console.log(window.innerWidth);
      return window.innerWidth <= 768;
    }
    const displayItems = (item, index, active, $items) => {
      const zIndex = getZindex([...$items], active)[index];
      item.style.setProperty("--zIndex", zIndex);
      item.style.setProperty("--active", (index - active) / $items.length);
      const prevActiveIndex = active - 1;
      const nextActiveIndex = active + 1;
      if (isMobileView()) {
        $items[active] && $items[active].style.setProperty("--y", "-20%");
        $items[prevActiveIndex] &&
          $items[prevActiveIndex].style.setProperty("--y", "-19%");

        $items[nextActiveIndex] &&
          $items[nextActiveIndex].style.setProperty("--y", "7%");
      } else {
        $items[active] && $items[active].style.setProperty("--y", "-15%");
        $items[prevActiveIndex] &&
          $items[prevActiveIndex].style.setProperty("--y", "-10%");

        $items[nextActiveIndex] &&
          $items[nextActiveIndex].style.setProperty("--y", "18%");
      }
      setActiveIndex(active);
    };

    const animate = () => {
      progress = Math.max(0, Math.min(progress, 100));
      active = Math.floor((progress / 100) * ($items.length - 1));

      $items.forEach((item, index) =>
        displayItems(item, index, active, $items)
      );
    };
    animate();

    $items.forEach((item, i) => {
      item.addEventListener("click", () => {
        progress = (i / $items.length) * 100 + 10;
        animate();
      });
    });

    const handleMouseMove = (e) => {
      if (e.type === "mousemove") {
        $cursors.forEach(($cursor) => {
          $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
      }
      if (!isDown) return;
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const mouseProgress = (x - startX) * speedDrag;
      progress = progress + mouseProgress;
      startX = x;
      animate();
    };

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const handleMouseUp = () => {
      isDown = false;
    };
    const handleMouseLeave = () => {
      isDown = false;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchstart", handleMouseDown);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchstart", handleMouseDown);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      $items.forEach((item, i) => {
        item.removeEventListener("click", () => {
          progress = (i / $items.length) * 100 + 10;
          animate();
        });
      });
    };
  }, []);

  return (
    <div>
      <div ref={ref} className={`carousel ${props.isVisible ? "fade-in" : ""}`}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="carousel-item">
              <img
                src={image.webp}
                alt={image.title}
                onError={(e) => handleImageError(e, image.image)}
              />
            </div>
            {index === activeIndex && (
              <div className="image-details">
                <h1 className="image-title">{image.title}</h1>
                <p className="image-desc"> {image.desc} </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Carousel;
