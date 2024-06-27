import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComponent.css';

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      id: 1,
      image: 'https://via.placeholder.com/800x400',
      title: 'Doctor 1',
      description: 'Specialist in Cardiology',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/800x400',
      title: 'Doctor 2',
      description: 'Specialist in Neurology',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/800x400',
      title: 'Doctor 3',
      description: 'Specialist in Orthopedics',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="p-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img src={slide.image} alt={slide.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{slide.title}</h3>
                <p className="text-gray-600">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
