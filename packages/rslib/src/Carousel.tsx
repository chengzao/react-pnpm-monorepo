import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

import './carousel.css';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export const CarouselCustom = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const goTo = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
  ];

  return (
    <div className="carousel">
      <Carousel
        autoplay
        autoplaySpeed={2000}
        arrows={false}
        dots={false}
        ref={carouselRef}
        afterChange={setActiveIndex}
      >
        {data.map((item) => (
          <div key={item.id}>
            <h3 style={contentStyle}>{item.name}</h3>
          </div>
        ))}
      </Carousel>
      <div className="controls">
        <ul className="dots">
          {data.map((item, index) => (
            <li
              key={item.id}
              className={`${activeIndex === index ? 'active' : ''} dot`}
              onClick={() => goTo(index)}
            ></li>
          ))}
        </ul>
        <div className="arrows">
          <span className="arrow left" onClick={prev}>
            <ArrowIcon />
          </span>
          <span className="arrow right" onClick={next}>
            <ArrowIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillOpacity={0.7}
      fillRule="evenodd"
      d="m6.686 8.5 4.32-4.32a.667.667 0 0 0 0-.943l-.142-.141a.667.667 0 0 0-.942 0L4.518 8.5l5.404 5.404c.26.26.682.26.942 0l.142-.141a.667.667 0 0 0 0-.943L6.686 8.5Z"
      clipRule="evenodd"
    />
  </svg>
);
