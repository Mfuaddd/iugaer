import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const BasketContext = createContext();

function BasketProvider({ children }) {
  const [basket, setBasket] = useLocalStorage("basket", []);

  function addToBasket(x) {
    const inx = basket.findIndex((b) => b.id === x.id);
    if (inx === -1) {
      setBasket([...basket, { ...x, count: 1 }]);
      return;
    }
    basket[inx].count++;
    setBasket([...basket]);
  }

  function removeFromBasket(x) {
    setBasket(basket.filter((b) => b.id !== x.id));
  }

  function increaseCount(x) {
    const inx = basket.findIndex((b) => b.id === x.id);
    basket[inx].count++;
    setBasket([...basket]);
  }

  function decreaseCount(x) {
    const inx = basket.findIndex((b) => b.id === x.id);
    if(basket[inx].count > 1)
        basket[inx].count--;
    setBasket([...basket]);
  }

  function getTotalPrice() {
    return basket.reduce((prev,x)=> prev + x.price * x.count ,0).toFixed(2)
  }
  const data = {
    basket,addToBasket,removeFromBasket,increaseCount,decreaseCount,getTotalPrice
  }

  return <BasketContext.Provider value={data}>{children}</BasketContext.Provider>;
}

export default BasketProvider;
