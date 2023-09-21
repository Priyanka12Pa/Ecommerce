import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./Slider.css";
const Slider = () => {
return (
    <Splide aria-label="My Favorite Images"  className="head" >
     
      <SplideSlide className="imgs">
        <img className="img" src="https://www.searchenginejournal.com/wp-content/uploads/2020/03/20-free-things-you-need-to-do-after-launching-your-ecommerce-website-5e664bcb60da5-760x400.webp"  />
      </SplideSlide>
    
      <SplideSlide className="imgs" >
        <img className="img" src="https://www.qable.io/wp-content/uploads/2021/08/Why-is-testing-most-important-for-your-E-Commerce-website.png" />
      </SplideSlide>
    
    </Splide>
  );
};

export default Slider;
