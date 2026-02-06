import { Link } from "wouter";
import { motion } from "framer-motion";
import { Wand2, Camera, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full overflow-x-hidden bg-gradient-to-b from-background to-secondary/10">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground font-medium mb-6">
              <Star className="w-4 h-4 fill-accent-foreground" />
              <span>Touché Artistique Mariage - Votre souvenir éternel.</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6">
              Capturez Votre Amour en <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Touché Artistique
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Créez des figurines 3D personnalisées pour votre gâteau de mariage ou comme souvenir précieux. 
              Choisissez nos styles classiques ou envoyez vos photos pour une création 1-sur-1.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
            {/* Standard Configurator Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="group relative bg-card rounded-3xl p-8 border hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wand2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Le Studio de Création</h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  Configurez vos personnages : coiffures, tenues de mariage et poses romantiques.
                </p>
                <Link href="/configurator">
                  <Button size="lg" className="w-full text-lg rounded-xl h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                    Créer Mon Topper <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Custom Request Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="group relative bg-card rounded-3xl p-8 border hover:border-secondary/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Camera className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Réplique Photo</h3>
                <p className="text-muted-foreground mb-8 flex-grow">
                  Envoyez les photos de vos essayages. Nos artistes sculptent une pièce unique de votre grand jour.
                </p>
                <Link href="/custom">
                  <Button size="lg" variant="outline" className="w-full text-lg rounded-xl h-14 border-accent text-accent hover:bg-accent hover:text-white shadow-lg shadow-accent/10">
                    Envoyer Mes Photos <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom */}
      <div className="w-full h-24 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
    </div>
  );
}
