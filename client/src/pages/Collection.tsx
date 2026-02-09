import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, Sparkles, Palette, Camera, ArrowRight, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface Product {
  id: string;
  name: string;
  name_fr: string;
  description: string;
  description_fr: string;
  image: string;
  badge?: string;
  badge_fr?: string;
}

const STANDARD_FIGURINES: Product[] = [
  {
    id: "elegant-classic",
    name: "The Elegant Classic",
    name_fr: "L'Élégant Classique",
    description: "Dark-haired bride in white gown with her dashing groom in a charcoal suit.",
    description_fr: "Mariée brune en robe blanche avec son élégant marié en costume gris.",
    image: "/uploads/Standard figurine_Image_l9yxekl9yxekl9yx.png",
    badge: "BESTSELLER",
    badge_fr: "BEST-SELLER",
  },
  {
    id: "silver-charm",
    name: "Silver Charm",
    name_fr: "Charme Argenté",
    description: "Distinguished silver-haired groom in steel blue with his graceful brunette bride.",
    description_fr: "Marié distingué aux cheveux argentés en bleu acier avec sa gracieuse mariée brune.",
    image: "/uploads/Standard figurine_Image_mhjv1xmhjv1xmhjv.png",
  },
  {
    id: "bohemian-duo",
    name: "The Bohemian Duo",
    name_fr: "Le Duo Bohème",
    description: "Free-spirited couple with flowing locks — groom in blue suit, blonde bride with bouquet.",
    description_fr: "Couple libre aux cheveux longs — marié en costume bleu, mariée blonde avec bouquet.",
    image: "/uploads/Standard figurine_Image_zukt6zukt6zukt6z.png",
  },
  {
    id: "modern-romance",
    name: "Modern Romance",
    name_fr: "Romance Moderne",
    description: "Wavy-haired groom in blue suit paired with a golden-haired bride in a sleek white gown.",
    description_fr: "Marié aux cheveux ondulés en costume bleu avec une mariée dorée en robe blanche.",
    image: "/uploads/Standard figurine_Image_5fvtyf5fvtyf5fvt.png",
  },
  {
    id: "sun-kissed",
    name: "Sun-Kissed Love",
    name_fr: "Amour Ensoleillé",
    description: "Warm-toned couple with curly brown hair groom and his beautiful dark-haired bride.",
    description_fr: "Couple chaleureux avec un marié aux cheveux bouclés et sa belle mariée aux cheveux noirs.",
    image: "/uploads/Standard figurine_Image_2q9w322q9w322q9w.png",
    badge: "POPULAR",
    badge_fr: "POPULAIRE",
  },
  {
    id: "golden-contrast",
    name: "Golden Contrast",
    name_fr: "Contraste Doré",
    description: "Blonde groom in a crisp blue suit with his stunning curly-haired bride.",
    description_fr: "Marié blond en costume bleu impeccable avec sa magnifique mariée aux cheveux bouclés.",
    image: "/uploads/Standard figurine_Image_9k34y19k34y19k34.png",
  },
  {
    id: "blonde-bliss",
    name: "Blonde Bliss",
    name_fr: "Bonheur Blond",
    description: "A radiant all-blonde couple — groom in blue suit and bride in flowing white gown.",
    description_fr: "Un couple blond radieux — marié en costume bleu et mariée en robe blanche fluide.",
    image: "/uploads/Standard figurine_Image_kxooaykxooaykxoo.png",
  },
  {
    id: "curly-elegance",
    name: "Curly Elegance",
    name_fr: "Élégance Bouclée",
    description: "Short-haired groom in blue suit with his beautiful bride sporting golden curls.",
    description_fr: "Marié aux cheveux courts en costume bleu avec sa belle mariée aux boucles dorées.",
    image: "/uploads/Standard figurine_Image_fsehdkfsehdkfseh.png",
  },
  {
    id: "classic-updo",
    name: "Classic Updo",
    name_fr: "Chignon Classique",
    description: "Clean-cut groom in blue with his blonde bride wearing an elegant updo.",
    description_fr: "Marié soigné en bleu avec sa mariée blonde au chignon élégant.",
    image: "/uploads/Standard figurine_Image_iwb318iwb318iwb3.png",
  },
  {
    id: "midnight-garden",
    name: "Midnight Garden",
    name_fr: "Jardin de Minuit",
    description: "Brown-haired groom in blue suit alongside his dark-haired bride with bouquet.",
    description_fr: "Marié brun en costume bleu aux côtés de sa mariée aux cheveux noirs avec bouquet.",
    image: "/uploads/Standard figurine_Image_uumq98uumq98uumq.png",
  },
  {
    id: "sweet-curls",
    name: "Sweet Curls",
    name_fr: "Douces Boucles",
    description: "Dapper short-haired groom paired with his curly-haired blonde bride.",
    description_fr: "Marié élégant aux cheveux courts avec sa mariée blonde aux cheveux bouclés.",
    image: "/uploads/Standard figurine_Image_qoivuwqoivuwqoiv.png",
  },
  {
    id: "island-love",
    name: "Island Love",
    name_fr: "Amour Insulaire",
    description: "Blonde groom in blue suit with his gorgeous dark-skinned bride and curly hair.",
    description_fr: "Marié blond en costume bleu avec sa magnifique mariée aux cheveux bouclés.",
    image: "/uploads/Standard figurine_Image_xputwhxputwhxput.png",
    badge: "NEW",
    badge_fr: "NOUVEAU",
  },
  {
    id: "timeless-grace",
    name: "Timeless Grace",
    name_fr: "Grâce Intemporelle",
    description: "Smart-looking groom in blue suit with his bride wearing a beautiful updo.",
    description_fr: "Marié élégant en costume bleu avec sa mariée au beau chignon.",
    image: "/uploads/Standard figurine_Image_tfjxp9tfjxp9tfjx.png",
  },
  {
    id: "noir-glamour",
    name: "Noir Glamour",
    name_fr: "Glamour Noir",
    description: "Sophisticated groom in a black tuxedo with his bride in a stunning lace gown.",
    description_fr: "Marié sophistiqué en smoking noir avec sa mariée dans une superbe robe en dentelle.",
    image: "/uploads/Standard figurine_Image_l6vxa5l6vxa5l6vx.png",
    badge: "PREMIUM",
    badge_fr: "PREMIUM",
  },
];

const PRICE = "€39.99";
const PRICE_FR = "39,99€";

export default function Collection() {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleBuy = (product: Product) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
    setOrderSuccess(false);
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/orders/ready", {
        productId: selectedProduct.id,
        productName: language === "fr" ? selectedProduct.name_fr : selectedProduct.name,
        name,
        email,
      });
      setOrderSuccess(true);
    } catch {
      toast({
        title: t("general.orderFailed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="relative bg-gradient-to-b from-secondary/20 via-background to-background">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs sm:text-sm font-semibold">
                {language === "fr" ? "Collection Standard" : "Standard Collection"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold leading-tight">
              {language === "fr" ? (
                <>Choisissez votre <span className="text-primary">duo parfait</span></>
              ) : (
                <>Choose your <span className="text-primary">perfect duo</span></>
              )}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === "fr"
                ? "Nos figurines prêtes-à-porter sont fabriquées à la main avec amour. Chaque modèle est unique — choisissez celui qui vous ressemble le plus."
                : "Our ready-made figurines are handcrafted with love. Each model is unique — choose the one that looks most like you."}
            </p>
            <div className="flex items-center justify-center gap-6 pt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" />
                {language === "fr" ? "Livraison gratuite" : "Free shipping"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" />
                {language === "fr" ? "Fait main" : "Handcrafted"}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" />
                {language === "fr" ? "Emballage cadeau" : "Gift wrapped"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STANDARD_FIGURINES.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group bg-card rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-muted/30 to-muted/60 p-4">
                <img
                  src={product.image}
                  alt={language === "fr" ? product.name_fr : product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <div className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 ${
                      product.badge === "BESTSELLER" || product.badge === "PREMIUM"
                        ? "bg-primary text-primary-foreground"
                        : product.badge === "NEW"
                        ? "bg-accent text-accent-foreground"
                        : "bg-white/90 backdrop-blur text-foreground"
                    }`}>
                      {product.badge === "BESTSELLER" || product.badge === "PREMIUM" ? (
                        <Star className="w-3 h-3 fill-current" />
                      ) : product.badge === "NEW" ? (
                        <Sparkles className="w-3 h-3" />
                      ) : (
                        <Heart className="w-3 h-3 fill-current text-primary" />
                      )}
                      <span>{language === "fr" ? product.badge_fr : product.badge}</span>
                    </div>
                  </div>
                )}
                {/* Quick buy overlay */}
                <AnimatePresence>
                  {hoveredId === product.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-3 left-3 right-3"
                    >
                      <Button
                        onClick={() => handleBuy(product)}
                        className="w-full rounded-xl shadow-lg h-11 text-sm font-semibold"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {language === "fr" ? "Acheter" : "Buy Now"} — {language === "fr" ? PRICE_FR : PRICE}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-display font-bold text-base leading-tight">
                  {language === "fr" ? product.name_fr : product.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {language === "fr" ? product.description_fr : product.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-primary">
                    {language === "fr" ? PRICE_FR : PRICE}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleBuy(product)}
                    className="rounded-xl text-xs h-9 px-4"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                    {language === "fr" ? "Acheter" : "Buy"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upsell Section */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/20 border border-accent/20 p-10 sm:p-14 text-center"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-sm font-semibold text-accent mb-6">
              <Sparkles className="w-4 h-4" />
              {language === "fr" ? "Envie d'un look unique ?" : "Want a unique look?"}
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {language === "fr"
                ? "Personnalisez votre figurine"
                : "Customize your figurine"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base leading-relaxed">
              {language === "fr"
                ? "Nos modèles standard ne vous correspondent pas tout à fait ? Pas de souci — nous proposons deux options de personnalisation pour créer la figurine parfaite."
                : "Our standard models don't quite match you? No worries — we offer two customization options to create the perfect figurine."}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Semi-Standard Option */}
              <Link href="/configurator">
                <div className="group bg-card/80 backdrop-blur rounded-2xl p-6 border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer text-left h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">
                      {language === "fr" ? "Semi-Personnalisable" : "Semi-Customizable"}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {language === "fr"
                      ? "Choisissez la coiffure, la couleur de peau et la tenue dans notre configurateur interactif."
                      : "Choose hairstyle, skin color, and outfit in our interactive configurator."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {language === "fr" ? "59,99€" : "€59.99"}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {language === "fr" ? "Configurer" : "Configure"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Fully Custom Option */}
              <Link href="/custom">
                <div className="group bg-card/80 backdrop-blur rounded-2xl p-6 border border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-300 cursor-pointer text-left h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Camera className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg">
                      {language === "fr" ? "100% Sur Mesure" : "Fully Customizable"}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {language === "fr"
                      ? "Envoyez vos photos et nous créerons une réplique artistique unique, faite à la main."
                      : "Send your photos and we'll handcraft a one-of-a-kind artistic replica just for you."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-accent">
                      {language === "fr" ? "À partir de 99,99€" : "From €99.99"}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                      {language === "fr" ? "Créer" : "Create"}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <AnimatePresence mode="wait">
            {orderSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-display font-bold">
                  {t("general.orderSuccess.title")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t("general.orderSuccess.description")}
                </p>
                <Button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="rounded-xl mt-2"
                >
                  {language === "fr" ? "Fermer" : "Close"}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">
                    {t("collection.checkout.title")}
                  </DialogTitle>
                  <DialogDescription>
                    {t("collection.checkout.subtitle")}
                  </DialogDescription>
                </DialogHeader>

                {selectedProduct && (
                  <div className="flex items-center gap-4 my-4 p-3 rounded-xl bg-muted/50">
                    <img
                      src={selectedProduct.image}
                      alt={language === "fr" ? selectedProduct.name_fr : selectedProduct.name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {language === "fr" ? selectedProduct.name_fr : selectedProduct.name}
                      </p>
                      <p className="text-primary font-bold">
                        {language === "fr" ? PRICE_FR : PRICE}
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkout-name">{t("collection.checkout.name")}</Label>
                    <Input
                      id="checkout-name"
                      name="name"
                      required
                      placeholder={language === "fr" ? "Votre nom complet" : "Your full name"}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkout-email">{t("collection.checkout.email")}</Label>
                    <Input
                      id="checkout-email"
                      name="email"
                      type="email"
                      required
                      placeholder={language === "fr" ? "votre@email.com" : "your@email.com"}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">
                      {language === "fr" ? "Livraison" : "Shipping"}
                    </span>
                    <span className="font-medium text-green-600">
                      {language === "fr" ? "Gratuite" : "Free"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">{language === "fr" ? PRICE_FR : PRICE}</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl h-12 text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("collection.checkout.processing")
                      : t("collection.checkout.submit")}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
