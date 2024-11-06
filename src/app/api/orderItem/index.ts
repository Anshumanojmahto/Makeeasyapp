import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItem = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_item">[]) {
      const { error, data: newProduct } = await supabase
        .from("order_item")
        .insert(items)
        .select();
      if (error) throw error;
      return newProduct;
    },
    onError(error) {
      console.log(error);
    },
  });
};
