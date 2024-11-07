import { CartItem, Tables } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/app/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItem } from "@/app/api/orderItem";
import { useAuth } from "./AuthProvider";
import RazorpayCheckout from "react-native-razorpay";
type Product = Tables<"products">;

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: String, change: -1 | 1) => void;
  total: number;
  checkOut: () => void;
};
type Options = {
  description: string;
  image: string;
  currency: string;
  key: string;
  amount: number;
  name: string;
  order_id: string; // Add this line
  prefill: {
    email: string;
    contact: string;
    name: string;
  };
  theme: {
    color: string;
  };
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
  function checkOut() {
    const userId = session?.user.id;
    if (!userId) {
      throw new Error("User ID is missing");
    }

    // Ensure `total` is valid before proceeding
    if (!total || total <= 0) {
      throw new Error("Cart total is invalid.");
    }

    // Generate a unique order ID if it’s not provided by the backend
    const orderId = "";
    const totalamount = Math.floor(total * 100);

    // Define all required fields in Options to avoid undefined errors
    const options: Options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: "INR",
      key: "rzp_test_NQQef7bb0NQnY4", // Replace with your actual Razorpay API key
      amount: totalamount, // Convert total to the smallest currency unit
      name: "Makeeasy",
      order_id: orderId, // Pass the unique order ID
      prefill: {
        email: "five@gmail.com",
        contact: "9191919191",
        name: "Razorpay Software",
      },
      theme: { color: "#F37254" },
    };

    // Open Razorpay with error handling
    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle successful payment with data.razorpay_payment_id
        alert(`Success: ${data.razorpay_payment_id}`);
        InsertOrder(
          { total, user_id: userId as string },
          {
            onSuccess: saveOrderItems,
          }
        );
      })
      .catch((error) => {
        console.log(error);

        return;
      });

    // Insert order in the backend database
  }
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
