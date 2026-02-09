import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSemiOrder } from "@/hooks/use-orders";
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

const OUTFITS = [
  { id: "wedding_dress", label: "Robe de Mariée" },
  { id: "tuxedo", label: "Smoking" },
  { id: "suit", label: "Costume" },
  { id: "traditional", label: "Traditionnel" },
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
  { id: "hugging", label: "Câlin" },
];

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
});

type ConfigState = {
  pose: string;
  skinColor: string;
  hairStyle: string;
  outfitColor: string;
  dressType: string;
};

export default function Configurator() {
  const [config, setConfig] = useState<ConfigState>({
    pose: "holding_hands",
    skinColor: "light",
    hairStyle: "bob",
    outfitColor: "white",
    dressType: "wedding_dress",
  });
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toast } = useToast();
  const createOrder = useCreateSemiOrder();
  
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleCheckout = (data: z.infer<typeof checkoutSchema>) => {
    createOrder.mutate({
      customer: {
        ...data,
        totalPrice: 6900, // $69.00
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
          description: "We'll start crafting your custom figurine right away.",
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden bg-background">
      
      {/* LEFT: Controls */}
      <div className="w-full lg:w-1/3 flex flex-col border-r bg-white/50 backdrop-blur-sm z-10 h-full overflow-hidden">
        <div className="p-6 border-b bg-white/80">
          <h2 className="text-2xl font-bold font-display text-primary">Semi-Standard Studio</h2>
          <p className="text-sm text-muted-foreground">Personnalisez votre création par étapes</p>
        </div>

        <Tabs defaultValue="pose" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-4">
            <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1 h-12 rounded-xl">
              <TabsTrigger value="pose" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Move className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Pose</span>
              </TabsTrigger>
              <TabsTrigger value="skin" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Smile className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Peau</span>
              </TabsTrigger>
              <TabsTrigger value="hair" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Scissors className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Cheveux</span>
              </TabsTrigger>
              <TabsTrigger value="outfit" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Shirt className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Tenue</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
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

            <TabsContent value="skin" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <ColorPicker
                label="Teint de Peau"
                options={SKINS}
                value={config.skinColor}
                onChange={(c) => setConfig({ ...config, skinColor: c })}
              />
            </TabsContent>

            <TabsContent value="hair" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-3">
                <Label className="uppercase text-xs text-muted-foreground font-bold tracking-wider">Style de Coiffure</Label>
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
            </TabsContent>

            <TabsContent value="outfit" className="space-y-8 mt-0 animate-in slide-in-from-left-4 duration-300">
              <div className="space-y-3">
                <Label className="uppercase text-xs text-muted-foreground font-bold tracking-wider">Type de Tenue</Label>
                <div className="grid grid-cols-2 gap-3">
                  {OUTFITS.map((item) => (
                    <OptionCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      selected={config.dressType === item.id}
                      onClick={() => setConfig({ ...config, dressType: item.id })}
                    />
                  ))}
                </div>
              </div>
              <ColorPicker
                label="Couleur du Tissu"
                options={OUTFIT_COLORS}
                value={config.outfitColor}
                onChange={(c) => setConfig({ ...config, outfitColor: c })}
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="p-6 border-t bg-white/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Total</span>
            <span className="text-2xl font-bold font-display">$69.00</span>
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
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
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
               <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-100" />
               <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                 
                 {/* Face */}
                 <motion.div 
                    className="w-20 h-24 rounded-[2rem] z-20 shadow-md relative"
                    animate={{ backgroundColor: SKINS.find(s => s.value === config.skinColor)?.hex }}
                 >
                    <div className="absolute top-8 left-4 w-2 h-2 bg-black/80 rounded-full" />
                    <div className="absolute top-8 right-4 w-2 h-2 bg-black/80 rounded-full" />
                 </motion.div>

                 {/* Body / Outfit */}
                 <motion.div 
                   className="w-28 h-40 rounded-3xl mt-[-10px] z-10 shadow-lg relative flex items-center justify-center"
                   animate={{ backgroundColor: OUTFIT_COLORS.find(c => c.value === config.outfitColor)?.hex }}
                 >
                    <div className="text-white/30 text-xs font-bold uppercase tracking-widest">
                      {OUTFITS.find(o => o.id === config.dressType)?.label}
                    </div>
                 </motion.div>
                 
                 <div className="flex gap-2 mt-[-10px]">
                   <div className="w-10 h-32 bg-slate-800 rounded-full" />
                   <div className="w-10 h-32 bg-slate-800 rounded-full" />
                 </div>
               </div>

               <div className="absolute top-6 left-6 flex flex-col gap-2">
                 <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide text-muted-foreground">
                   {POSES.find(p => p.id === config.pose)?.label}
                 </div>
               </div>
             </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-lg border max-w-xs text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-1 text-primary font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Live Preview</span>
          </div>
          Cette représentation stylisée vous aide à visualiser votre figurine personnalisée.
        </div>
      </div>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Finaliser la commande</DialogTitle>
            <DialogDescription>
              Veuillez remplir vos informations de contact.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom Complet</Label>
              <Input id="name" {...form.register("customerName")} placeholder="Prénom Nom" />
              {form.formState.errors.customerName && (
                <span className="text-xs text-destructive">{form.formState.errors.customerName.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("customerEmail")} placeholder="votre@email.com" />
              {form.formState.errors.customerEmail && (
                <span className="text-xs text-destructive">{form.formState.errors.customerEmail.message}</span>
              )}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2">
              <div className="flex justify-between">
                <span>Figurine Semi-Standard</span>
                <span className="font-bold">$69.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-xs">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-primary">
                <span>Total</span>
                <span>$69.00</span>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full" disabled={createOrder.isPending}>
                {createOrder.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Traitement...
                  </>
                ) : (
                  "Passer la commande"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
