import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};
const cartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

const [items, setItems] = useState<CartItem[]>([]);

function addItem(product: Product, size: CartItem["size"]) {
  const newProduct = {
    id: "1",
    product,
    product_id: product.id,
    size,
    quantity: 1,
  };

  setItems([newProduct, ...items]);
}

const CartContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <cartContext.Provider value={{ items, addItem }}>
      {children}
    </cartContext.Provider>
  );
};
export default CartContextProvider;

export const useCart = () => useContext(cartContext);
