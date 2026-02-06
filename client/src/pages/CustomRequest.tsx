import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Upload, X, Check, Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

import { useUploadPhoto, useCreateCustomOrder } from "@/hooks/use-orders";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// Schema for the full form
const customOrderSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  description: z.string().min(10, "Please describe your request in more detail"),
  photoUrls: z.array(z.string()).min(1, "At least one photo is required").max(5, "Max 5 photos"),
});

export default function CustomRequest() {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const { toast } = useToast();
  
  const upload = useUploadPhoto();
  const createOrder = useCreateCustomOrder();

  const form = useForm<z.infer<typeof customOrderSchema>>({
    resolver: zodResolver(customOrderSchema),
    defaultValues: {
      photoUrls: [],
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const { url } = await upload.mutateAsync(file);
        setPhotos(prev => [...prev, url]);
        form.setValue("photoUrls", [...photos, url]);
      } catch (err) {
        // Error handled by hook
      }
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    form.setValue("photoUrls", newPhotos);
  };

  const onSubmit = (data: z.infer<typeof customOrderSchema>) => {
    createOrder.mutate({
      customer: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        totalPrice: 12900, // $129.00 fixed price for custom
      },
      details: {
        description: data.description,
        photoUrls: data.photoUrls,
      }
    }, {
      onSuccess: () => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#22c55e', '#3b82f6', '#f59e0b']
        });
        toast({
          title: "Request Sent!",
          description: "We've received your photos. Our artists will be in touch.",
        });
        setStep(3); // Success step
      }
    });
  };

  const nextStep = async () => {
    // Validate current step fields
    if (step === 1) {
      if (photos.length === 0) {
        toast({ title: "Photo required", description: "Please upload at least one photo.", variant: "destructive" });
        return;
      }
      const isValid = await form.trigger("description");
      if (isValid) setStep(2);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Progress Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2 text-primary">Création Sur Mesure</h1>
          <p className="text-muted-foreground mb-6">
            Envoyez-nous les photos de vos tenues et de vos visages pour une réplique artistique parfaite.
          </p>
          
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'}`}>1. Photos & Details</div>
            <div className="w-8 h-px bg-border" />
            <div className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'}`}>2. Contact Info</div>
            <div className="w-8 h-px bg-border" />
            <div className={`px-3 py-1 rounded-full ${step >= 3 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>3. Done</div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-6 md:p-8 shadow-xl border-border/60 bg-white/80 backdrop-blur-sm">
          {step === 3 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">All Set!</h2>
              <p className="text-muted-foreground mb-6">
                Your request has been submitted. Check your email for confirmation.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/'}>Back Home</Button>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  
                  {/* Photo Upload */}
                  <div className="space-y-4">
                    <Label className="text-lg">Reference Photos</Label>
                    <p className="text-sm text-muted-foreground">Upload clear photos from front, back, and sides.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photos.map((url, idx) => (
                        <div key={url} className="relative aspect-square rounded-xl overflow-hidden border shadow-sm group">
                          <img src={url} alt="Upload" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(idx)}
                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      
                      {photos.length < 5 && (
                        <label className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-secondary hover:bg-secondary/5 transition-colors">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange}
                            disabled={upload.isPending}
                          />
                          {upload.isPending ? (
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground font-medium">Add Photo</span>
                            </>
                          )}
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="desc" className="text-lg">Special Instructions</Label>
                    <Textarea 
                      id="desc" 
                      placeholder="Describe specific details like tattoos, jewelry, or specific pose requirements..." 
                      className="min-h-[150px] resize-none"
                      {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                      <span className="text-sm text-destructive">{form.formState.errors.description.message}</span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Your Information</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...form.register("customerName")} placeholder="Jane Doe" />
                        {form.formState.errors.customerName && (
                          <span className="text-sm text-destructive">{form.formState.errors.customerName.message}</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" {...form.register("customerEmail")} placeholder="jane@example.com" />
                        {form.formState.errors.customerEmail && (
                          <span className="text-sm text-destructive">{form.formState.errors.customerEmail.message}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/10 p-4 rounded-xl space-y-2 border border-secondary/20">
                    <div className="flex justify-between font-medium">
                      <span>Custom Commission Base Price</span>
                      <span>$129.00</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *Final price may vary based on complexity. We will contact you if additional costs apply.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                {step === 1 ? (
                  <Button type="button" variant="ghost" onClick={() => window.history.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                ) : (
                  <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                )}

                {step === 1 ? (
                  <Button type="button" onClick={nextStep} className="px-8">
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="px-8 bg-secondary hover:bg-secondary/90 text-white" disabled={createOrder.isPending}>
                    {createOrder.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                )}
              </div>

            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
