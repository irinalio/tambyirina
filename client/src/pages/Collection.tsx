import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

const READY_PRODUCTS = [
  {
    id: "classic_wedding",
    name: "Classic Wedding Duo",
    name_fr: "Duo Mariage Classique",
    price: "$49.00",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "romantic_hug",
    name: "Romantic Hug",
    name_fr: "Câlin Romantique",
    price: "$49.00",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "forever_love",
    name: "Forever Love",
    name_fr: "Amour Éternel",
    price: "$49.00",
    image: "https://images.unsplash.com/photo-1522673607200-164897eeca55?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Collection() {
  const { t, language } = useI18n();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 pt-12">
        <header className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold font-display mb-4">
            {language === 'fr' ? 'La Collection Prêt-à-Porter' : 'Ready-Made Collection'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'fr' 
              ? 'Découvrez nos modèles les plus appréciés, prêts à rejoindre votre cérémonie.' 
              : 'Discover our most loved models, ready to join your ceremony.'}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {READY_PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span>POPULAR</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold mb-2">
                  {language === 'fr' ? product.name_fr : product.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-6">{product.price}</p>
                <Button className="w-full rounded-xl">
                  {language === 'fr' ? 'Commander' : 'Order Now'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[3rem] bg-accent/5 border border-accent/20 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'fr' ? 'Vous cherchez quelque chose d\'unique ?' : 'Looking for something unique?'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {language === 'fr' 
              ? 'Si vous ne trouvez pas votre bonheur dans notre collection, essayez notre studio de personnalisation.' 
              : 'If you can\'t find what you\'re looking for in our collection, try our customization studio.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/configurator">
              <Button variant="outline" className="rounded-xl px-8 h-12">
                {t('home.card.semi.button')}
              </Button>
            </Link>
            <Link href="/custom">
              <Button className="rounded-xl px-8 h-12 bg-accent hover:bg-accent/90">
                {t('home.card.custom.button')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
