import React, { useContext, useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BasketContext } from "../../contexts/BasketContext";
import { wishlistContext } from "../../contexts/WishlistContext";

function Header() {
  const {
    basket,
    addToBasket,
    removeFromBasket,
    increaseCount,
    decreaseCount,
    getTotalPrice,
  } = useContext(BasketContext);
  const { wishlist, toggleWishlist } = useContext(wishlistContext);

  const [basketMenu, setBasketMenu] = useState(false);
  const [wishListMenu, setWishListMenu] = useState(false);

  function closeBasket(e) {
    // e.stopPropagation();
    setBasketMenu(!basketMenu);
  }

  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__left">
            <img
              src="https://preview.colorlib.com/theme/eiser/img/logo.png.webp"
              alt=""
            />
          </div>
          <nav className="header__navbar">
            <ul>
              <li>HOME</li>
              <li>SHOP</li>
              <li>BLOG</li>
              <li>PAGES</li>
              <li>CONTACT</li>
            </ul>
          </nav>
          <div className="header__right">
            <ul>
              <li>
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              </li>
              <li onClick={() => setBasketMenu(!basketMenu)}>
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                <sup>{basket.reduce((prev,x)=> prev + x.count ,0)}</sup>
                <div
                  className="aside"
                  onClick={(e) => e.stopPropagation()}
                  style={
                    basketMenu
                      ? { transform: "translateX(0)" }
                      : { transform: "translateX(100%)" }
                  }
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button onClick={() => setBasketMenu(!basketMenu)}>
                      x
                    </button>
                    <span>Total Price: {getTotalPrice()}$</span>
                  </div>
                  <div className="aside__wrapper">
                    {basket.map((x) => (
                      <div className="aside__card">
                        <ul key={x.id} className="aside__card__left">
                          <li>{x.title}</li>
                          <li>{x.price*x.count}$</li>
                          <li>
                            <button onClick={() => decreaseCount(x)}>-</button>
                            {x.count}
                            <button onClick={() => increaseCount(x)}>+</button>
                          </li>
                          <li>
                            <button onClick={() =>removeFromBasket(x)}>
                              ELIMINATE
                            </button>
                          </li>
                        </ul>
                        <div className="aside__card__right">
                          <img src={x.image} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </li>
              <li onClick={() => setWishListMenu(!wishListMenu)}>
                <FontAwesomeIcon icon="fa-solid fa-heart" />
                <div
                  className="aside"
                  onClick={(e) => e.stopPropagation()}
                  style={
                    wishListMenu
                      ? { transform: "translateX(0)" }
                      : { transform: "translateX(100%)" }
                  }
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button onClick={() => setWishListMenu(!wishListMenu)}>
                      x
                    </button>
                  </div>
                  <div className="aside__wrapper">
                    {wishlist.map((x) => (
                      <div className="aside__card">
                        <ul key={x.id} className="aside__card__left">
                          <li>{x.title}</li>
                          <li>{x.price}$</li>
                          <li>
                            <button onClick={() => toggleWishlist(x)}>
                              ELIMINATE
                            </button>
                          </li>
                        </ul>
                        <div className="aside__card__right">
                          <img src={x.image} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
