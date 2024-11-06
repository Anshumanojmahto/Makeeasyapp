import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: InsertTables<"order_item">) {
      const { error, data: newProduct } = await supabase
        .from("order_item")
        .insert({ ...data })
        .select()
        .single();
      if (error) throw error;
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
