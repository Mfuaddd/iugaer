import React, { useEffect, useState } from "react";
import "./index.scss";

function Slider() {
  const [apiData, setApiData] = useState([]);
  const [tak, setTak] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setApiData(data.map((x) => x.image));
    })();
  }, []);

//   console.log(apiData);
  console.log(tak);


  

  return (
    <div className="slider">
      <ul className="slider__body" style={{transform: `translateX${100}%` }}>
        <li><img src={apiData[tak]} alt="" /></li>
        <li>
          <img src={apiData[tak]} alt="" />
        </li>
        <li>
          <img src={apiData[tak+1]} alt="" />
        </li>
      </ul>
      <div className="slider__left" onClick={()=>setTak((tak % apiData.length)+ (apiData.length - 1))}>LEFT</div>
      <div className="slider__right" onClick={()=>setTak(tak % apiData.length+1)}>RIGHT</div>
    </div>
  );
}

export default Slider;
