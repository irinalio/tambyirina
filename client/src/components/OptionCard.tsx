import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface OptionCardProps {
  id: string;
  label: { en: string; fr: string } | string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ id, label, selected, onClick }: OptionCardProps) {
  const { language } = useI18n();
  const displayLabel = typeof label === "string" ? label : label[language];

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
        selected
          ? "border-primary bg-primary/5 text-primary shadow-sm"
          : "border-border bg-card text-foreground hover:border-primary/30"
      }`}
    >
      {displayLabel}
    </motion.button>
  );
}

export default OptionCard;
