import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ColorOption {
  value: string;
  label: string;
  hex: string;
}

interface ColorPickerProps {
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function ColorPicker({ options, value, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="group relative outline-none"
            title={option.label}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "w-10 h-10 rounded-full shadow-sm border-2 transition-all duration-200",
                value === option.value
                  ? "border-primary ring-2 ring-primary/30 ring-offset-2"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
              style={{ backgroundColor: option.hex }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
