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
    'home.card.ready.title': 'Prêt-à-Porter',
    'home.card.ready.desc': 'Choisissez parmi nos modèles les plus populaires déjà prêts.',
    'home.card.ready.button': 'Voir la Collection',
    'home.card.semi.title': 'Semi-Standard',
    'home.card.semi.desc': 'Personnalisez votre figurine : pose, coiffure et tenues.',
    'home.card.semi.button': 'Personnaliser',
    'home.card.custom.title': '100% Sur Mesure',
    'home.card.custom.desc': 'Envoyez vos photos pour une réplique artistique unique.',
    'home.card.custom.button': 'Création Totale',
    'config.pose.holding': 'Main dans la Main',
    'config.pose.hugging': 'Câlin',
  },
  en: {
    'nav.home': 'Home',
    'nav.studio': 'Studio',
    'nav.custom': 'Custom',
    'home.hero.tag': 'Touché Artistique Wedding - Your eternal memory.',
    'home.hero.title': 'Capture Your Love in',
    'home.hero.subtitle': 'Touché Artistique',
    'home.hero.desc': 'Create personalized 3D figurines for your wedding cake or as a precious keepsake. Choose our ready-made styles, customize your own, or go fully bespoke.',
    'home.card.ready.title': 'Ready-Made',
    'home.card.ready.desc': 'Choose from our collection of popular pre-designed figurines.',
    'home.card.ready.button': 'View Collection',
    'home.card.semi.title': 'Semi-Standard',
    'home.card.semi.desc': 'Customize your figurine: pose, hairstyle, and wedding outfits.',
    'home.card.semi.button': 'Customize Now',
    'home.card.custom.title': 'Fully Bespoke',
    'home.card.custom.desc': 'Send your photos for a unique handcrafted artistic replica.',
    'home.card.custom.button': 'Start Creation',
    'config.pose.holding': 'Holding Hands',
    'config.pose.hugging': 'Hugging',
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
