import StarRating from "./StarRating";
import { useI18n } from "@/lib/i18n";

interface TestimonialCardProps {
  name: { en: string; fr: string };
  rating: number;
  comment: { en: string; fr: string };
}

export default function TestimonialCard({ name, rating, comment }: TestimonialCardProps) {
  const { language } = useI18n();

  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <StarRating rating={rating} size="sm" />
      <p className="text-foreground/80 italic leading-relaxed">
        &ldquo;{comment[language]}&rdquo;
      </p>
      <p className="text-sm font-semibold text-primary">
        {name[language]}
      </p>
    </div>
  );
}
