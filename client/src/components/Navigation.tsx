import { Link, useLocation } from "wouter";
import { Home, ShoppingBag, Palette, Camera, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

export default function Navigation() {
  const [location] = useLocation();
  const { t } = useI18n();

  const navItems = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/collection", label: t("nav.collection"), icon: ShoppingBag },
    { href: "/configurator", label: t("nav.studio"), icon: Palette },
    { href: "/custom", label: t("nav.custom"), icon: Camera },
    { href: "/reviews", label: t("nav.reviews"), icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-display font-bold text-lg shadow-md group-hover:rotate-6 transition-transform">
            T
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-display font-bold text-base text-foreground tracking-tight">
              {t("nav.brand")}
            </span>
            <span className="text-[10px] text-primary font-medium tracking-widest uppercase">
              {t("nav.brand.suffix")}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-full transition-all text-sm font-medium cursor-pointer",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
