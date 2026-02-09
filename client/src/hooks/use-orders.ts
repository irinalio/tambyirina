import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type CreateReadyOrderRequest, type CreateSemiOrderRequest, type CreateCustomOrderRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateReadyOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateReadyOrderRequest) => {
      const res = await fetch(api.orders.createReady.path, {
        method: api.orders.createReady.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }

      return api.orders.createReady.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateSemiOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateSemiOrderRequest) => {
      const res = await fetch(api.orders.createSemi.path, {
        method: api.orders.createSemi.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }

      return api.orders.createSemi.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateCustomOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateCustomOrderRequest) => {
      const res = await fetch(api.orders.createCustom.path, {
        method: api.orders.createCustom.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }

      return api.orders.createCustom.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Order Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
