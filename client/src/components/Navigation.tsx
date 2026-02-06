import { Link, useLocation } from "wouter";
import { Sparkles, Box, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Sparkles },
    { href: "/configurator", label: "Studio", icon: Box },
    { href: "/custom", label: "Custom", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">
            M
          </div>
          <span className="font-display font-bold text-xl text-foreground tracking-tight">
            Mini<span className="text-primary">Me</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer text-sm font-medium",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
