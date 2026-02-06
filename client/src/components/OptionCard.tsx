import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface OptionCardProps {
  id: string;
  label: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function OptionCard({ id, label, icon: Icon, selected, onClick, className }: OptionCardProps) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 w-full h-full min-h-[100px]",
        selected
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
          : "border-border bg-card hover:border-primary/50 hover:bg-accent/5",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "w-8 h-8 transition-colors",
            selected ? "text-primary" : "text-muted-foreground"
          )}
        />
      )}
      <span
        className={cn(
          "font-medium text-sm text-center",
          selected ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
      {selected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute inset-0 border-2 border-primary rounded-xl pointer-events-none"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}
