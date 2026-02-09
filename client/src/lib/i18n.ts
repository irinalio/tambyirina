import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'fr' | 'en';

interface I18nState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.collection': 'Collection',
    'nav.studio': 'Studio',
    'nav.custom': 'Custom',
    'nav.reviews': 'Reviews',
    'nav.brand': 'Touche Artistique',
    'nav.brand.suffix': 'Mariage',

    // Homepage - Hero
    'home.hero.badge': 'Handcrafted Wedding Figurines',
    'home.hero.title': 'A tiny version of your biggest moment.',
    'home.hero.titleAccent': 'Artistic Detail',
    'home.hero.description':
      'Because some days are too special to only keep in a photo album. Get a custom "mini-you" for your wedding cake, and keep a handcrafted memory of your favorite outfit—and your favorite person—forever.',
    'home.hero.cta.collection': 'Discover Collection',
    'home.hero.cta.create': 'Start Creating',

    // Homepage - Service Cards
    'home.card.ready.title': 'Ready-Made Collection',
    'home.card.ready.description': 'Choose from our curated collection of pre-designed wedding figurines. Select tuxedo and hair colors.',
    'home.card.ready.price': '\u20ac39.99',
    'home.card.ready.cta': 'View Collection',

    'home.card.semi.title': 'Semi-Customizable',
    'home.card.semi.description': 'Customize hair, skin, and outfit colors with our interactive visual configurator.',
    'home.card.semi.price': '\u20ac59.99',
    'home.card.semi.cta': 'Customize Now',

    'home.card.custom.title': 'Fully Custom',
    'home.card.custom.description': 'Send your photos and we\'ll handcraft a one-of-a-kind artistic replica just for you.',
    'home.card.custom.price': 'From \u20ac99.99',
    'home.card.custom.cta': 'Start Creation',

    // Homepage - Reviews
    'home.reviews.title': 'What Our Couples Say',
    'home.reviews.subtitle': 'Real stories from real weddings',
    'home.reviews.add': 'Add a Review',
    'home.reviews.seeAll': 'See All Reviews',

    // Collection Page
    'collection.title': 'Ready-Made Collection',
    'collection.subtitle': 'Discover our most loved models, ready to join your ceremony.',
    'collection.tuxedoColor': 'Tuxedo Color',
    'collection.hairColor': 'Hair Color',
    'collection.orderNow': 'Order Now',
    'collection.popular': 'POPULAR',
    'collection.crossSell.title': 'Looking for something unique?',
    'collection.crossSell.semi': 'Try our customization studio',
    'collection.crossSell.custom': 'or go fully bespoke',

    // Collection Checkout
    'collection.checkout.title': 'Complete Your Order',
    'collection.checkout.subtitle': 'Enter your contact information to place the order.',
    'collection.checkout.name': 'Full Name',
    'collection.checkout.email': 'Email',
    'collection.checkout.submit': 'Place Order',
    'collection.checkout.processing': 'Processing...',

    // Configurator Page
    'config.title': 'Design Your Figurine',
    'config.subtitle': 'Customize every detail step by step',
    'config.tab.hairStyle': 'Hair Style',
    'config.tab.hairColor': 'Hair Color',
    'config.tab.skin': 'Skin',
    'config.tab.outfit': 'Outfit',
    'config.tuxedoColor': 'Tuxedo Color',
    'config.dressColor': 'Dress Color',
    'config.preview.title': 'Live Preview',
    'config.preview.description': 'This stylized preview helps you visualize your custom figurine.',
    'config.total': 'Total',
    'config.checkout': 'Review & Order',

    // Configurator Checkout
    'config.checkout.title': 'Complete Your Order',
    'config.checkout.subtitle': 'Enter your contact information to place the order.',
    'config.checkout.name': 'Full Name',
    'config.checkout.email': 'Email',
    'config.checkout.item': 'Semi-Custom Figurine',
    'config.checkout.shipping': 'Shipping',
    'config.checkout.free': 'Free',
    'config.checkout.submit': 'Place Order',
    'config.checkout.processing': 'Processing...',

    // Custom Request Page
    'custom.title': 'Fully Custom Creation',
    'custom.subtitle': 'Send your photos and describe your dream figurine.',
    'custom.step1': 'Photos & Details',
    'custom.step2': 'Your Info',
    'custom.step3': 'Done',
    'custom.photos.title': 'Reference Photos',
    'custom.photos.subtitle': 'Upload clear photos from different angles (up to 5).',
    'custom.photos.add': 'Add Photo',
    'custom.description.title': 'Special Instructions',
    'custom.description.placeholder': 'Describe specific details like tattoos, jewelry, or pose...',
    'custom.info.title': 'Your Information',
    'custom.info.name': 'Full Name',
    'custom.info.email': 'Email Address',
    'custom.price.label': 'Base Price',
    'custom.price.value': '\u20ac99.99',
    'custom.price.note': '*Final price may vary based on complexity.',
    'custom.next': 'Next Step',
    'custom.back': 'Back',
    'custom.submit': 'Submit Request',
    'custom.sending': 'Sending...',
    'custom.success.title': 'All Set!',
    'custom.success.description': 'Your request has been submitted. Check your email for confirmation.',
    'custom.success.back': 'Back Home',
    'custom.photoRequired.title': 'Photo required',
    'custom.photoRequired.description': 'Please upload at least one photo.',

    // Reviews Page
    'reviews.title': 'Customer Reviews',
    'reviews.subtitle': 'See what our happy couples have to say.',
    'reviews.add': 'Write a Review',
    'reviews.empty': 'No reviews yet. Be the first to share your experience!',
    'reviews.form.title': 'Share Your Experience',
    'reviews.form.name': 'Your Name',
    'reviews.form.email': 'Your Email',
    'reviews.form.rating': 'Rating',
    'reviews.form.comment': 'Your Review',
    'reviews.form.commentPlaceholder': 'Tell us about your experience with your figurine...',
    'reviews.form.photo': 'Add a Photo of Your Figurine',
    'reviews.form.photoOptional': '(optional)',
    'reviews.form.submit': 'Submit Review',
    'reviews.form.sending': 'Submitting...',
    'reviews.form.success': 'Thank you for your review!',
    'reviews.form.cancel': 'Cancel',

    // General
    'general.orderSuccess.title': 'Order Placed!',
    'general.orderSuccess.description': 'We\'ll start crafting your figurine right away.',
    'general.orderFailed': 'Order Failed',
    'general.uploadFailed': 'Upload Failed',

    // Footer
    'footer.brand': 'Touch\u00e9 Artistique Mariage',
    'footer.tagline': 'Handcrafted wedding figurines, made with love.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',

    // 404
    'notFound.title': 'Page Not Found',
    'notFound.description': 'The page you\'re looking for doesn\'t exist.',
    'notFound.back': 'Back Home',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.collection': 'Collection',
    'nav.studio': 'Studio',
    'nav.custom': 'Sur Mesure',
    'nav.reviews': 'Avis',
    'nav.brand': 'Touche Artistique',
    'nav.brand.suffix': 'Mariage',

    // Homepage - Hero
    'home.hero.badge': 'Figurines de Mariage Artisanales',
    'home.hero.title': 'Une petite version de votre plus grand moment.',
    'home.hero.titleAccent': 'Touch\u00e9 Artistique',
    'home.hero.description':
      'Parce que certains jours sont trop sp\u00e9ciaux pour rester seulement dans un album photo. Cr\u00e9ez votre "mini-vous" pour votre g\u00e2teau de mariage et gardez un souvenir artisanal de votre tenue pr\u00e9f\u00e9r\u00e9e\u2014et de votre personne pr\u00e9f\u00e9r\u00e9e\u2014pour toujours.',
    'home.hero.cta.collection': 'D\u00e9couvrir la Collection',
    'home.hero.cta.create': 'Commencer',

    // Homepage - Service Cards
    'home.card.ready.title': 'Collection Pr\u00eat-\u00e0-Porter',
    'home.card.ready.description': 'Choisissez parmi notre collection de figurines pr\u00e9-design\u00e9es. S\u00e9lectionnez la couleur du smoking et des cheveux.',
    'home.card.ready.price': '39,99\u20ac',
    'home.card.ready.cta': 'Voir la Collection',

    'home.card.semi.title': 'Semi-Personnalisable',
    'home.card.semi.description': 'Personnalisez les cheveux, la peau et les couleurs de tenue avec notre configurateur visuel.',
    'home.card.semi.price': '59,99\u20ac',
    'home.card.semi.cta': 'Personnaliser',

    'home.card.custom.title': '100% Sur Mesure',
    'home.card.custom.description': 'Envoyez vos photos pour une r\u00e9plique artistique unique faite \u00e0 la main.',
    'home.card.custom.price': '\u00c0 partir de 99,99\u20ac',
    'home.card.custom.cta': 'Cr\u00e9er',

    // Homepage - Reviews
    'home.reviews.title': 'Ce Que Disent Nos Couples',
    'home.reviews.subtitle': 'De vraies histoires de vrais mariages',
    'home.reviews.add': 'Laisser un Avis',
    'home.reviews.seeAll': 'Voir Tous les Avis',

    // Collection Page
    'collection.title': 'Collection Pr\u00eat-\u00e0-Porter',
    'collection.subtitle': 'D\u00e9couvrez nos mod\u00e8les les plus appr\u00e9ci\u00e9s, pr\u00eats \u00e0 rejoindre votre c\u00e9r\u00e9monie.',
    'collection.tuxedoColor': 'Couleur du Smoking',
    'collection.hairColor': 'Couleur des Cheveux',
    'collection.orderNow': 'Commander',
    'collection.popular': 'POPULAIRE',
    'collection.crossSell.title': 'Vous cherchez quelque chose d\'unique ?',
    'collection.crossSell.semi': 'Essayez notre studio de personnalisation',
    'collection.crossSell.custom': 'ou cr\u00e9ez sur mesure',

    // Collection Checkout
    'collection.checkout.title': 'Finaliser la Commande',
    'collection.checkout.subtitle': 'Entrez vos informations de contact.',
    'collection.checkout.name': 'Nom Complet',
    'collection.checkout.email': 'Email',
    'collection.checkout.submit': 'Passer la Commande',
    'collection.checkout.processing': 'Traitement...',

    // Configurator Page
    'config.title': 'Designez Votre Figurine',
    'config.subtitle': 'Personnalisez chaque d\u00e9tail \u00e9tape par \u00e9tape',
    'config.tab.hairStyle': 'Coiffure',
    'config.tab.hairColor': 'Couleur',
    'config.tab.skin': 'Peau',
    'config.tab.outfit': 'Tenue',
    'config.tuxedoColor': 'Couleur du Smoking',
    'config.dressColor': 'Couleur de la Robe',
    'config.preview.title': 'Aper\u00e7u en Direct',
    'config.preview.description': 'Cette repr\u00e9sentation stylis\u00e9e vous aide \u00e0 visualiser votre figurine.',
    'config.total': 'Total',
    'config.checkout': 'Finaliser',

    // Configurator Checkout
    'config.checkout.title': 'Finaliser la Commande',
    'config.checkout.subtitle': 'Entrez vos informations de contact.',
    'config.checkout.name': 'Nom Complet',
    'config.checkout.email': 'Email',
    'config.checkout.item': 'Figurine Semi-Personnalis\u00e9e',
    'config.checkout.shipping': 'Livraison',
    'config.checkout.free': 'Gratuite',
    'config.checkout.submit': 'Passer la Commande',
    'config.checkout.processing': 'Traitement...',

    // Custom Request Page
    'custom.title': 'Cr\u00e9ation Sur Mesure',
    'custom.subtitle': 'Envoyez vos photos et d\u00e9crivez votre figurine de r\u00eave.',
    'custom.step1': 'Photos & D\u00e9tails',
    'custom.step2': 'Vos Infos',
    'custom.step3': 'Confirm\u00e9',
    'custom.photos.title': 'Photos de R\u00e9f\u00e9rence',
    'custom.photos.subtitle': 'T\u00e9l\u00e9chargez des photos claires sous diff\u00e9rents angles (jusqu\'\u00e0 5).',
    'custom.photos.add': 'Ajouter',
    'custom.description.title': 'Instructions Sp\u00e9ciales',
    'custom.description.placeholder': 'D\u00e9crivez les d\u00e9tails sp\u00e9cifiques comme les tatouages, bijoux ou pose...',
    'custom.info.title': 'Vos Informations',
    'custom.info.name': 'Nom Complet',
    'custom.info.email': 'Adresse Email',
    'custom.price.label': 'Prix de Base',
    'custom.price.value': '99,99\u20ac',
    'custom.price.note': '*Le prix final peut varier selon la complexit\u00e9.',
    'custom.next': 'Suivant',
    'custom.back': 'Retour',
    'custom.submit': 'Soumettre',
    'custom.sending': 'Envoi...',
    'custom.success.title': 'Tout est pr\u00eat !',
    'custom.success.description': 'Votre demande a \u00e9t\u00e9 soumise. V\u00e9rifiez vos emails.',
    'custom.success.back': 'Retour',
    'custom.photoRequired.title': 'Photo requise',
    'custom.photoRequired.description': 'Veuillez t\u00e9l\u00e9charger au moins une photo.',

    // Reviews Page
    'reviews.title': 'Avis Clients',
    'reviews.subtitle': 'D\u00e9couvrez ce que nos couples heureux en pensent.',
    'reviews.add': '\u00c9crire un Avis',
    'reviews.empty': 'Aucun avis pour le moment. Soyez le premier \u00e0 partager votre exp\u00e9rience !',
    'reviews.form.title': 'Partagez Votre Exp\u00e9rience',
    'reviews.form.name': 'Votre Nom',
    'reviews.form.email': 'Votre Email',
    'reviews.form.rating': 'Note',
    'reviews.form.comment': 'Votre Avis',
    'reviews.form.commentPlaceholder': 'Racontez-nous votre exp\u00e9rience avec votre figurine...',
    'reviews.form.photo': 'Ajouter une Photo de Votre Figurine',
    'reviews.form.photoOptional': '(optionnel)',
    'reviews.form.submit': 'Soumettre l\'Avis',
    'reviews.form.sending': 'Envoi...',
    'reviews.form.success': 'Merci pour votre avis !',
    'reviews.form.cancel': 'Annuler',

    // General
    'general.orderSuccess.title': 'Commande Pass\u00e9e !',
    'general.orderSuccess.description': 'Nous commencerons \u00e0 cr\u00e9er votre figurine imm\u00e9diatement.',
    'general.orderFailed': 'Commande \u00c9chou\u00e9e',
    'general.uploadFailed': '\u00c9chec du T\u00e9l\u00e9chargement',

    // Footer
    'footer.brand': 'Touch\u00e9 Artistique Mariage',
    'footer.tagline': 'Figurines de mariage artisanales, faites avec amour.',
    'footer.links': 'Liens Rapides',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits r\u00e9serv\u00e9s.',

    // 404
    'notFound.title': 'Page Introuvable',
    'notFound.description': 'La page que vous recherchez n\'existe pas.',
    'notFound.back': 'Retour',
  },
};

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const lang = get().language;
        return translations[lang][key] || key;
      },
    }),
    { name: 'i18n-storage' }
  )
);
