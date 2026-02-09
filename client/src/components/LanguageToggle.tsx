import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
      className="gap-1.5 text-muted-foreground hover:text-foreground"
    >
      <Globe className="w-4 h-4" />
      <span className="text-xs font-medium uppercase">{language === "fr" ? "EN" : "FR"}</span>
    </Button>
  );
}
