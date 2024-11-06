import { CartItem, Tables } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/app/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItem } from "@/app/api/orderItem";
import { useAuth } from "./AuthProvider";
type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: String, change: -1 | 1) => void;
  total: number;
  checkOut: () => void;
};
const cartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkOut: () => {},
});

const CartContextProvider = ({ children }: PropsWithChildren) => {
  const { session } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const { mutate: InsertOrder } = useInsertOrder();
  const { mutate: InsertOrderItem } = useInsertOrderItem();
  const router = useRouter();
  const clearCart = () => {
    setItems([]);
  };

  function checkOut() {
    const userId = session?.user.id;
    if (!userId) {
      throw new Error("User ID is missing");
    }
    InsertOrder(
      { total, user_id: userId as string },
      {
        onSuccess: saveOrderItems,
      }
    );
  }
  const saveOrderItems = (order: any) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));

    InsertOrderItem(orderItems, {
      onSuccess: () => {
        clearCart();
        router.push(`/(user)/orders`);
      },
    });
  };

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
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  return (
    <cartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkOut }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default CartContextProvider;

export const useCart = () => useContext(cartContext);
