import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, UpdateTables } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdminOrders = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useMyOrdersList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*,order_item(*,products(*))")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;
  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      if (!userId) {
        throw new Error("User ID is missing");
      }
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({
          ...data,
          user_id: userId as string,
        })
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
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn({
      id,
      updatedData,
    }: {
      id: number;
      updatedData: UpdateTables<"orders">;
    }) {
      const { error, data: updatedProduct } = await supabase
        .from("orders")
        .update(updatedData)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
