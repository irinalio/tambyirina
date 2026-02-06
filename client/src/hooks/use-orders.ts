import { useMutation } from "@tanstack/react-query";
import { api, type CreateStandardOrderRequest, type CreateCustomOrderRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateStandardOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateStandardOrderRequest) => {
      const res = await fetch(api.orders.createStandard.path, {
        method: api.orders.createStandard.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }

      return api.orders.createStandard.responses[201].parse(await res.json());
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

export function useUploadPhoto() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(api.orders.upload.path, {
        method: api.orders.upload.method,
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      return api.orders.upload.responses[200].parse(await res.json());
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
