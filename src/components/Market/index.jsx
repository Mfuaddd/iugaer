import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BasketContext } from "../../contexts/BasketContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { wishlistContext } from "../../contexts/WishlistContext";


function Market() {
  const {basket,addToBasket} = useContext(BasketContext)
  const {wishlist,toggleWishlist} = useContext(wishlistContext)
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setApiData(data);
    })();
  }, []);

  return (
    <>
      <div className="market">
        <div className="market__container">
          <div className="market__header">
            <h2>INSPIRED PRODUCTS</h2>
          </div>
          <div className="market__body">
            {apiData.map((x) => {
              let inxBasket = basket.findIndex(b=>b.id===x.id);
              let inxWishlist = wishlist.findIndex(b=>b.id===x.id);
              return (
                <ul className="market__body__card">
                  <img src={x.image} alt="" />
                  <li>{x.title}</li>
                  <li>{x.price}$</li>
                  <li style={{display:"flex", justifyContent:"space-evenly"}}>
                    <FontAwesomeIcon onClick={() => addToBasket(x)} style={inxBasket !== -1 ? {display:"none" } : null} icon="fa-solid fa-cart-shopping" />
                    <FontAwesomeIcon onClick={() => toggleWishlist(x)} style={inxWishlist !== -1 ? {display:"none" } : null} icon="fa-solid fa-heart" />
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Market;
