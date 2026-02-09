import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

interface ColorOption {
  value: string;
  label: { en: string; fr: string };
  hex: string;
}

interface ColorPickerProps {
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPicker({ options, value, onChange, label }: ColorPickerProps) {
  const { language } = useI18n();

  return (
    <div className="space-y-3">
      {label && (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(option.value)}
            className="group relative flex flex-col items-center gap-1.5"
            title={option.label[language]}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                value === option.value
                  ? "border-primary ring-2 ring-primary/30 ring-offset-2"
                  : "border-border hover:border-primary/50"
              }`}
              style={{ backgroundColor: option.hex }}
            />
            <span className="text-xs text-muted-foreground">
              {option.label[language]}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
