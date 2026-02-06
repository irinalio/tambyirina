import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'fr' | 'en';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    'nav.home': 'Accueil',
    'nav.studio': 'Studio',
    'nav.custom': 'Sur Mesure',
    'home.hero.tag': 'Touché Artistique Mariage - Votre souvenir éternel.',
    'home.hero.title': 'Capturez Votre Amour en',
    'home.hero.subtitle': 'Touché Artistique',
    'home.hero.desc': 'Créez des figurines 3D personnalisées pour votre gâteau de mariage ou comme souvenir précieux. Choisissez nos styles classiques ou envoyez vos photos pour une création 1-sur-1.',
    'home.card.studio.title': 'Le Studio de Création',
    'home.card.studio.desc': 'Configurez vos personnages : coiffures, tenues de mariage et poses romantiques.',
    'home.card.studio.button': 'Créer Mon Topper',
    'home.card.custom.title': 'Réplique Photo',
    'home.card.custom.desc': 'Envoyez les photos de vos essayages. Nos artistes sculptent une pièce unique de votre grand jour.',
    'home.card.custom.button': 'Envoyer Mes Photos',
    'config.title': 'Touché Artistique',
    'config.desc': 'Créez votre cake topper personnalisé',
    'config.tabs.hair': 'Cheveux',
    'config.tabs.body': 'Corps',
    'config.tabs.outfit': 'Tenue',
    'config.tabs.pose': 'Pose',
    'config.total': 'Total',
    'config.button': 'Acheter',
    'custom.title': 'Création Sur Mesure',
    'custom.desc': 'Envoyez-nous les photos de vos tenues et de vos visages pour une réplique artistique parfaite.',
    'custom.step1': '1. Photos & Détails',
    'custom.step2': '2. Contact',
    'custom.step3': '3. Terminé',
  },
  en: {
    'nav.home': 'Home',
    'nav.studio': 'Studio',
    'nav.custom': 'Custom',
    'home.hero.tag': 'Touché Artistique Wedding - Your eternal memory.',
    'home.hero.title': 'Capture Your Love in',
    'home.hero.subtitle': 'Touché Artistique',
    'home.hero.desc': 'Create personalized 3D figurines for your wedding cake or as a precious keepsake. Choose our classic styles or send your photos for a 1-to-1 creation.',
    'home.card.studio.title': 'Creation Studio',
    'home.card.studio.desc': 'Configure your characters: hairstyles, wedding outfits, and romantic poses.',
    'home.card.studio.button': 'Create My Topper',
    'home.card.custom.title': 'Photo Replica',
    'home.card.custom.desc': 'Send photos of your fittings. Our artists sculpt a unique piece of your big day.',
    'home.card.custom.button': 'Send My Photos',
    'config.title': 'Touché Artistique',
    'config.desc': 'Create your personalized cake topper',
    'config.tabs.hair': 'Hair',
    'config.tabs.body': 'Body',
    'config.tabs.outfit': 'Outfit',
    'config.tabs.pose': 'Pose',
    'config.total': 'Total',
    'config.button': 'Buy Now',
    'custom.title': 'Custom Creation',
    'custom.desc': 'Send us photos of your outfits and faces for a perfect artistic replica.',
    'custom.step1': '1. Photos & Details',
    'custom.step2': '2. Contact',
    'custom.step3': '3. Done',
  }
};

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const lang = get().language;
        return translations[lang][key as keyof typeof translations['fr']] || key;
      },
    }),
    { name: 'i18n-storage' }
  )
);
