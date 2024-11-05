import { CartItem, Tables } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: String, change: -1 | 1) => void;
  totalPrice: number;
};
const cartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  totalPrice: 0,
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(product: Product, size: CartItem["size"]) {
    //alredy exixt
    const repItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (repItem) {
      updateQuantity(repItem.id, 1);
      return;
    }

    const newProduct = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newProduct, ...items]);
  }
  function updateQuantity(id: String, change: -1 | 1) {
    setItems(
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }
  const totalPrice = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  return (
    <cartContext.Provider
      value={{ items, addItem, updateQuantity, totalPrice }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default CartContextProvider;

export const useCart = () => useContext(cartContext);
