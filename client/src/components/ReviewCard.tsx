import StarRating from "./StarRating";
import type { Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-foreground">{review.reviewerName}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-foreground/80 leading-relaxed">{review.comment}</p>
      {review.photoUrl && (
        <img
          src={review.photoUrl}
          alt="Figurine"
          className="w-full max-w-xs rounded-lg object-cover aspect-square"
        />
      )}
    </div>
  );
}
