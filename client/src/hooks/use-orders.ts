import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import {
  type CreateReadyOrderRequest,
  type CreateSemiOrderRequest,
  type CreateCustomOrderRequest,
  type CreateReviewRequest,
} from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";

export function useCreateReadyOrder() {
  const { toast } = useToast();
  const { t } = useI18n();

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

      return res.json();
    },
    onError: (error) => {
      toast({
        title: t("general.orderFailed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateSemiOrder() {
  const { toast } = useToast();
  const { t } = useI18n();

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

      return res.json();
    },
    onError: (error) => {
      toast({
        title: t("general.orderFailed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useCreateCustomOrder() {
  const { toast } = useToast();
  const { t } = useI18n();

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

      return res.json();
    },
    onError: (error) => {
      toast({
        title: t("general.orderFailed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUploadPhoto() {
  const { toast } = useToast();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(api.orders.upload.path, {
        method: api.orders.upload.method,
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Upload failed");
      }

      return res.json() as Promise<{ url: string }>;
    },
    onError: (error) => {
      toast({
        title: t("general.uploadFailed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(api.reviews.list.path);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useI18n();

  return useMutation({
    mutationFn: async (data: CreateReviewRequest) => {
      const res = await fetch(api.reviews.create.path, {
        method: api.reviews.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit review");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      toast({
        title: t("general.orderFailed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
