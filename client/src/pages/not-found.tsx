import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Home } from "lucide-react";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <p className="text-6xl font-display font-bold text-primary/30">404</p>
        <h1 className="text-2xl font-display font-bold">{t("notFound.title")}</h1>
        <p className="text-muted-foreground">{t("notFound.description")}</p>
        <Link href="/">
          <Button variant="outline" className="rounded-full gap-2 mt-4">
            <Home className="w-4 h-4" />
            {t("notFound.back")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
