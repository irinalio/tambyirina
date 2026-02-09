import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {t("footer.brand")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t("footer.links")}</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.home")}
              </Link>
              <Link href="/collection" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.collection")}
              </Link>
              <Link href="/configurator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.studio")}
              </Link>
              <Link href="/custom" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.custom")}
              </Link>
              <Link href="/reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t("nav.reviews")}
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t("footer.contact")}</h4>
            <p className="text-sm text-muted-foreground">
              contact@touche-artistique.com
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} {t("footer.brand")}.</span>
          <span>{t("footer.rights")}</span>
          <Heart className="w-3 h-3 text-primary fill-primary mx-1" />
        </div>
      </div>
    </footer>
  );
}
