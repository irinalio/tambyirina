import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateStandardOrder } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { 
  Smile, Scissors, Shirt, Move, Check, Loader2, Sparkles, Star 
} from "lucide-react";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { OptionCard } from "@/components/OptionCard";
import { ColorPicker } from "@/components/ColorPicker";

// --- Config Data ---
const HAIR_STYLES = [
  { id: "bob", label: "Bob Cut" },
  { id: "long", label: "Long Waves" },
  { id: "pixie", label: "Pixie" },
  { id: "bun", label: "Messy Bun" },
  { id: "spiky", label: "Spiky" },
  { id: "bald", label: "Smooth" },
];

const HAIR_COLORS = [
  { value: "black", label: "Black", hex: "#1a1a1a" },
  { value: "brown", label: "Brown", hex: "#4a3728" },
  { value: "blonde", label: "Blonde", hex: "#e6c288" },
  { value: "red", label: "Red", hex: "#8d301b" },
  { value: "fantasy", label: "Pink", hex: "#ff69b4" },
];

const OUTFITS = [
  { id: "wedding_dress", label: "Robe de Mariée" },
  { id: "tuxedo", label: "Smoking / Tuxedo" },
  { id: "suit", label: "Costume Classique" },
  { id: "boho", label: "Style Bohème" },
  { id: "traditional", label: "Tenue Traditionnelle" },
];

const OUTFIT_COLORS = [
  { value: "white", label: "Blanc Cassé", hex: "#fcfcfc" },
  { value: "ivory", label: "Ivoire", hex: "#fffff0" },
  { value: "black", label: "Noir", hex: "#1f2937" },
  { value: "navy", label: "Bleu Marine", hex: "#1e3a8a" },
  { value: "grey", label: "Gris Anthracite", hex: "#374151" },
];

const SKINS = [
  { value: "light", label: "Clair", hex: "#fde4d5" },
  { value: "medium", label: "Médium", hex: "#dcb698" },
  { value: "tan", label: "Halé", hex: "#ae8b6d" },
  { value: "dark", label: "Foncé", hex: "#6d4c38" },
];

const POSES = [
  { id: "holding_hands", label: "Main dans la Main" },
  { id: "kissing", label: "Le Baiser" },
  { id: "dancing", label: "Première Danse" },
  { id: "looking_forward", label: "Regard vers l'Avenir" },
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
});

type ConfigState = {
  hairStyle: string;
  hairColor: string;
  skinColor: string;
  outfitStyle: string;
  outfitColor: string;
  pose: string;
};

export default function Configurator() {
  const [config, setConfig] = useState<ConfigState>({
    hairStyle: "bob",
    hairColor: "brown",
    skinColor: "light",
    outfitStyle: "wedding_dress",
    outfitColor: "white",
    pose: "holding_hands",
  });
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toast } = useToast();
  const createOrder = useCreateStandardOrder();
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout = (data: z.infer<typeof checkoutSchema>) => {
    createOrder.mutate({
      customer: {
        ...data,
        totalPrice: 4900, // $49.00
      },
      details: config,
    }, {
      onSuccess: () => {
        setIsCheckoutOpen(false);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#ec4899', '#f59e0b']
        });
        toast({
          title: "Order Placed!",
          description: "We'll start crafting your mini-me right away.",
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-background">
      
      {/* LEFT: Controls */}
      <div className="w-full lg:w-1/3 flex flex-col border-r bg-white/50 backdrop-blur-sm z-10 h-full overflow-hidden">
        <div className="p-6 border-b bg-white/80">
          <h2 className="text-2xl font-bold font-display text-primary">Touché Artistique</h2>
          <p className="text-sm text-muted-foreground">Créez votre cake topper personnalisé</p>
        </div>

        <Tabs defaultValue="hair" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-4">
            <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1 h-12 rounded-xl">
              <TabsTrigger value="hair" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Scissors className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Hair</span>
              </TabsTrigger>
              <TabsTrigger value="body" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Smile className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Body</span>
              </TabsTrigger>
              <TabsTrigger value="outfit" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Shirt className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Wear</span>
              </TabsTrigger>
              <TabsTrigger value="pose" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Move className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Pose</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            <TabsContent value="hair" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-3">
                <Label className="uppercase text-xs text-muted-foreground font-bold tracking-wider">Style</Label>
                <div className="grid grid-cols-2 gap-3">
                  {HAIR_STYLES.map((style) => (
                    <OptionCard
                      key={style.id}
                      id={style.id}
                      label={style.label}
                      selected={config.hairStyle === style.id}
                      onClick={() => setConfig({ ...config, hairStyle: style.id })}
                    />
                  ))}
                </div>
              </div>
              <ColorPicker
                label="Hair Color"
                options={HAIR_COLORS}
                value={config.hairColor}
                onChange={(c) => setConfig({ ...config, hairColor: c })}
              />
            </TabsContent>

            <TabsContent value="body" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <ColorPicker
                label="Skin Tone"
                options={SKINS}
                value={config.skinColor}
                onChange={(c) => setConfig({ ...config, skinColor: c })}
              />
            </TabsContent>

            <TabsContent value="outfit" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-3">
                <Label className="uppercase text-xs text-muted-foreground font-bold tracking-wider">Style</Label>
                <div className="grid grid-cols-2 gap-3">
                  {OUTFITS.map((item) => (
                    <OptionCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      selected={config.outfitStyle === item.id}
                      onClick={() => setConfig({ ...config, outfitStyle: item.id })}
                    />
                  ))}
                </div>
              </div>
              <ColorPicker
                label="Fabric Color"
                options={OUTFIT_COLORS}
                value={config.outfitColor}
                onChange={(c) => setConfig({ ...config, outfitColor: c })}
              />
            </TabsContent>

            <TabsContent value="pose" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-2 gap-3">
                {POSES.map((pose) => (
                  <OptionCard
                    key={pose.id}
                    id={pose.id}
                    label={pose.label}
                    selected={config.pose === pose.id}
                    onClick={() => setConfig({ ...config, pose: pose.id })}
                  />
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-6 border-t bg-white/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Total</span>
            <span className="text-2xl font-bold font-display">$49.00</span>
          </div>
          <Button 
            className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/25"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Review & Buy
          </Button>
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="w-full lg:w-2/3 relative bg-muted/30 flex items-center justify-center p-8 overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* The "Figurine" - simulated with layers */}
        <div className="relative z-10 w-[300px] md:w-[400px] aspect-[3/4] transition-all duration-500">
          <AnimatePresence mode="wait">
             <motion.div
               key={config.pose}
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.1 }}
               transition={{ type: "spring", stiffness: 100, damping: 20 }}
               className="relative w-full h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white ring-1 ring-black/5"
             >
               {/* 1. Background Scene */}
               <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-100" />
               
               {/* 2. Abstract Figurine Representation */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                 
                 {/* Hair */}
                 <motion.div 
                   className="w-24 h-24 rounded-full shadow-lg z-30 mb-[-10px]"
                   animate={{ backgroundColor: HAIR_COLORS.find(c => c.value === config.hairColor)?.hex }}
                 />
                 
                 {/* Face */}
                 <motion.div 
                    className="w-20 h-24 rounded-[2rem] z-20 shadow-md relative"
                    animate={{ backgroundColor: SKINS.find(s => s.value === config.skinColor)?.hex }}
                 >
                    {/* Eyes */}
                    <div className="absolute top-8 left-4 w-2 h-2 bg-black/80 rounded-full" />
                    <div className="absolute top-8 right-4 w-2 h-2 bg-black/80 rounded-full" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-black/40 rounded-full" />
                 </motion.div>

                 {/* Body / Outfit */}
                 <motion.div 
                   className="w-28 h-40 rounded-3xl mt-[-10px] z-10 shadow-lg relative flex items-center justify-center"
                   animate={{ backgroundColor: OUTFIT_COLORS.find(c => c.value === config.outfitColor)?.hex }}
                 >
                    {/* Outfit Detail Overlay */}
                    <div className="text-white/30">
                      {config.outfitStyle === 'superhero' && <Star className="w-12 h-12 fill-white/30" />}
                      {config.outfitStyle === 'suit' && <div className="w-4 h-24 bg-black/10" />}
                      {config.outfitStyle === 'casual' && <div className="text-xs font-bold">VIBES</div>}
                    </div>
                 </motion.div>
                 
                 {/* Legs */}
                 <div className="flex gap-2 mt-[-10px]">
                   <div className="w-10 h-32 bg-slate-800 rounded-full" />
                   <div className="w-10 h-32 bg-slate-800 rounded-full" />
                 </div>
               </div>

               {/* Labels/Badges */}
               <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide text-muted-foreground">
                   {POSES.find(p => p.id === config.pose)?.label}
                 </div>
               </div>

             </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Floating elements */}
        <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-lg border max-w-xs text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-1 text-primary font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Live Preview</span>
          </div>
          This is a stylized representation. The final 3D print will capture details with high precision.
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Masterpiece</DialogTitle>
            <DialogDescription>
              Just a few details to get your mini-you shipped.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...form.register("customerName")} placeholder="Jane Doe" />
              {form.formState.errors.customerName && (
                <span className="text-xs text-destructive">{form.formState.errors.customerName.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...form.register("customerEmail")} placeholder="jane@example.com" />
              {form.formState.errors.customerEmail && (
                <span className="text-xs text-destructive">{form.formState.errors.customerEmail.message}</span>
              )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span>Custom Standard Figurine</span>
                <span className="font-bold">$49.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-primary">
                <span>Total</span>
                <span>$49.00</span>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full" disabled={createOrder.isPending}>
                {createOrder.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
