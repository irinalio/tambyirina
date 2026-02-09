import { Link } from "wouter";
import { motion } from "framer-motion";
import { Palette, Camera, ShoppingBag, ArrowRight, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import TestimonialCard from "@/components/TestimonialCard";
import { TESTIMONIALS } from "@/data/testimonials";
import { useReviews } from "@/hooks/use-orders";
import ReviewCard from "@/components/ReviewCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { t, language } = useI18n();
  const { data: reviews } = useReviews();
  const featuredReviews = reviews?.slice(0, 3) || [];

  const cards = [
    {
      title: t("home.card.ready.title"),
      description: t("home.card.ready.description"),
      price: t("home.card.ready.price"),
      cta: t("home.card.ready.cta"),
      href: "/collection",
      icon: ShoppingBag,
      color: "primary",
    },
    {
      title: t("home.card.semi.title"),
      description: t("home.card.semi.description"),
      price: t("home.card.semi.price"),
      cta: t("home.card.semi.cta"),
      href: "/configurator",
      icon: Palette,
      color: "accent",
    },
    {
      title: t("home.card.custom.title"),
      description: t("home.card.custom.description"),
      price: t("home.card.custom.price"),
      cta: t("home.card.custom.cta"),
      href: "/custom",
      icon: Camera,
      color: "secondary",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 text-sm font-medium">
              <Diamond className="w-4 h-4 text-primary" />
              <span className="gradient-text text-xs sm:text-sm">
                {t("home.hero.badge")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight">
              {language === "fr" ? (
                <>
                  Une <span className="text-accent">petite version</span> de votre plus grand moment.
                </>
              ) : (
                <>
                  A <span className="text-accent">tiny version</span> of your biggest moment.
                </>
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("home.hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/collection">
                <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-md">
                  {t("home.hero.cta.collection")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/configurator">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base">
                  {t("home.hero.cta.create")}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const badgeClasses =
              card.color === "accent"
                ? "text-accent bg-accent/10"
                : card.color === "secondary"
                ? "text-secondary-foreground bg-secondary/40"
                : "text-primary bg-primary/10";

            const iconClasses =
              card.color === "accent"
                ? "text-accent"
                : card.color === "secondary"
                ? "text-secondary-foreground"
                : "text-primary";

            const buttonClasses =
              card.color === "accent"
                ? "bg-accent text-accent-foreground border-accent"
                : card.color === "secondary"
                ? "bg-secondary text-secondary-foreground border-secondary-border"
                : "";

            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-full mb-5">
                    {card.href === "/collection" ? (
                      <Carousel className="w-full">
                        <CarouselContent>
                          {["/uploads/figurine-1.png", "/uploads/figurine-2.png", "/uploads/figurine-3.png"].map(
                            (src) => (
                              <CarouselItem key={src}>
                                <div className="flex justify-center">
                                  <img
                                    src={src}
                                    alt="Wedding figurine from the ready-made collection"
                                    className="h-40 object-contain drop-shadow-md"
                                  />
                                </div>
                              </CarouselItem>
                            )
                          )}
                        </CarouselContent>
                        <CarouselPrevious className="-left-3 top-1/2 -translate-y-1/2 bg-white/80" />
                        <CarouselNext className="-right-3 top-1/2 -translate-y-1/2 bg-white/80" />
                      </Carousel>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                        <card.icon className={`w-7 h-7 ${iconClasses}`} />
                      </div>
                    )}
                  </div>
                  <div className="mb-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeClasses}`}
                    >
                      {card.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-grow">
                    {card.description}
                  </p>
                  <Link href={card.href}>
                    <Button className={`w-full rounded-xl ${buttonClasses}`}>
                      {card.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-2">{t("home.reviews.title")}</h2>
          <p className="text-muted-foreground">{t("home.reviews.subtitle")}</p>
        </div>

        {/* Show user reviews if available, otherwise show testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredReviews.length > 0
            ? featuredReviews.map((review: any) => (
                <ReviewCard key={review.id} review={review} />
              ))
            : TESTIMONIALS.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  rating={testimonial.rating}
                  comment={testimonial.comment}
                />
              ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reviews">
            <Button variant="outline" className="rounded-full px-6">
              {t("home.reviews.seeAll")}
            </Button>
          </Link>
          <Link href="/reviews">
            <Button className="rounded-full px-6">
              {t("home.reviews.add")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
