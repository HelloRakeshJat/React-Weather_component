import React from 'react';
import '../App.css';

const WeatherComponent = (props) => {
  console.log("WeatherComponent props ==>", props)
  let { image } = props

  return (
    <div>
      <img src={image} alt="Weather" className='image'/>
    </div>
  )
};

export default WeatherComponent