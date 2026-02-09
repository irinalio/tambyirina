import { useState, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { useCreateReview, useUploadPhoto } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StarRating from "./StarRating";
import { Camera, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ReviewForm({ onSuccess, onCancel }: ReviewFormProps) {
  const { t } = useI18n();
  const { toast } = useToast();
  const createReview = useCreateReview();
  const uploadPhoto = useUploadPhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadPhoto.mutateAsync(file);
      setPhotoUrl(result.url);
    } catch {
      toast({ title: t("general.uploadFailed"), variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createReview.mutateAsync({
        reviewerName: name,
        reviewerEmail: email,
        rating,
        comment,
        photoUrl,
      });
      toast({ title: t("reviews.form.success") });
      onSuccess();
    } catch {
      toast({ title: t("general.orderFailed"), variant: "destructive" });
    }
  };

  const isSubmitting = createReview.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-semibold font-display">{t("reviews.form.title")}</h3>

      <div className="space-y-2">
        <Label>{t("reviews.form.name")}</Label>
        <Input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("reviews.form.email")}</Label>
        <Input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("reviews.form.rating")}</Label>
        <StarRating rating={rating} onChange={setRating} size="lg" />
      </div>

      <div className="space-y-2">
        <Label>{t("reviews.form.comment")}</Label>
        <Textarea
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("reviews.form.commentPlaceholder")}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>
          {t("reviews.form.photo")}{" "}
          <span className="text-muted-foreground">{t("reviews.form.photoOptional")}</span>
        </Label>
        {photoUrl ? (
          <div className="relative inline-block">
            <img src={photoUrl} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => setPhotoUrl(null)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="gap-2"
          >
            <Camera className="w-4 h-4" />
            {uploading ? "..." : t("custom.photos.add")}
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? t("reviews.form.sending") : t("reviews.form.submit")}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("reviews.form.cancel")}
        </Button>
      </div>
    </form>
  );
}
