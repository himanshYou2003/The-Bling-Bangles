import { getBangleImages, getBangleMainImage } from './image-helpers';

export interface Bangle {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  type?: string;
  style?: string;
  finish?: string;
  material?: string;
  occasion?: string;
  images?: string[];
}

// Generate all 50 bangles with local images
export const BANGLES: Bangle[] = [
  { id: 1, name: 'The Royal Gold', description: '24K Pure gold with intricate hand-carved patterns.', image: getBangleMainImage(1), category: 'Bridal', type: 'Bridal', style: 'Traditional', finish: 'Glossy', material: '24K Pure Gold', occasion: 'Wedding, Grand Reception', images: getBangleImages(1) },
  { id: 2, name: 'Diamond Cascade', description: 'Brilliant cut diamonds set in white gold.', image: getBangleMainImage(2), category: 'Festive', type: 'Festive', style: 'Modern', finish: 'Glossy', material: '18K White Gold & VVS Diamonds', occasion: 'Gala Dinner, Red Carpet', images: getBangleImages(2) },
  { id: 3, name: 'Emerald Elegance', description: 'Deep green Colombian emeralds in a vintage setting.', image: getBangleMainImage(3), category: 'Bridal', images: getBangleImages(3) },
  { id: 4, name: 'Ruby Radiance', description: 'Burmese rubies surrounded by a halo of diamonds.', image: getBangleMainImage(4), category: 'Festive', images: getBangleImages(4) },
  { id: 5, name: 'Sapphire Serenity', description: 'Royal blue sapphires in a modern geometric design.', image: getBangleMainImage(5), category: 'Daily Wear', images: getBangleImages(5) },
  { id: 6, name: 'Pearl Perfection', description: 'South Sea pearls with a satin gold finish.', image: getBangleMainImage(6), category: 'Daily Wear', images: getBangleImages(6) },
  { id: 7, name: 'Platinum Prestige', description: 'Sleek platinum band with micro-pavé diamonds.', image: getBangleMainImage(7), category: 'Modern', images: getBangleImages(7) },
  { id: 8, name: 'Vintage Rose', description: 'Rose gold with Victorian-era inspired motifs.', image: getBangleMainImage(8), category: 'Vintage', images: getBangleImages(8) },
  { id: 9, name: 'Kundan Classic', description: 'Traditional Kundan work with red and green stones.', image: getBangleMainImage(9), category: 'Traditional', images: getBangleImages(9) },
  { id: 10, name: 'Art Deco Dream', description: 'Geometric patterns with onyx and diamond accents.', image: getBangleMainImage(10), category: 'Modern', images: getBangleImages(10) },
  { id: 11, name: 'Coral Charm', description: 'Natural coral beads set in 18K yellow gold.', image: getBangleMainImage(11), category: 'Festive', images: getBangleImages(11) },
  { id: 12, name: 'Mystic Topaz', description: 'Color-changing mystic topaz in white gold.', image: getBangleMainImage(12), category: 'Contemporary', images: getBangleImages(12) },
  { id: 13, name: 'Golden Heritage', description: 'Temple jewelry inspired 22K gold bangle.', image: getBangleMainImage(13), category: 'Traditional', images: getBangleImages(13) },
  { id: 14, name: 'Crystal Cascade', description: 'Swarovski crystals in a waterfall design.', image: getBangleMainImage(14), category: 'Modern', images: getBangleImages(14) },
  { id: 15, name: 'Turquoise Treasure', description: 'Genuine turquoise in sterling silver.', image: getBangleMainImage(15), category: 'Bohemian', images: getBangleImages(15) },
  { id: 16, name: 'Black Diamond Bold', description: 'Rare black diamonds in matte finish gold.', image: getBangleMainImage(16), category: 'Contemporary', images: getBangleImages(16) },
  { id: 17, name: 'Amethyst Aurora', description: 'Purple amethyst stones with rose gold.', image: getBangleMainImage(17), category: 'Vintage', images: getBangleImages(17) },
  { id: 18, name: 'Citrine Sunshine', description: 'Bright citrine stones in hammered gold.', image: getBangleMainImage(18), category: 'Daily Wear', images: getBangleImages(18) },
  { id: 19, name: 'Peacock Splendor', description: 'Peacock-inspired design with emeralds and rubies.', image: getBangleMainImage(19), category: 'Bridal', images: getBangleImages(19) },
  { id: 20, name: 'Minimalist Chic', description: 'Sleek single-line diamond bangle.', image: getBangleMainImage(20), category: 'Modern', images: getBangleImages(20) },
  { id: 21, name: 'Floral Fantasy', description: 'Intricate flower patterns in yellow gold.', image: getBangleMainImage(21), category: 'Traditional', images: getBangleImages(21) },
  { id: 22, name: 'Opal Opulence', description: 'Australian opal with diamond accents.', image: getBangleMainImage(22), category: 'Luxury', images: getBangleImages(22) },
  { id: 23, name: 'Twisted Elegance', description: 'Two-tone twisted cable design.', image: getBangleMainImage(23), category: 'Contemporary', images: getBangleImages(23) },
  { id: 24, name: 'Garnet Glory', description: 'Deep red garnets in antique finish.', image: getBangleMainImage(24), category: 'Vintage', images: getBangleImages(24) },
  { id: 25, name: 'Moonstone Magic', description: 'Ethereal moonstone cabochons in silver.', image: getBangleMainImage(25), category: 'Bohemian', images: getBangleImages(25) },
  { id: 26, name: 'Champagne Diamonds', description: 'Rare champagne diamonds in rose gold.', image: getBangleMainImage(26), category: 'Luxury', images: getBangleImages(26) },
  { id: 27, name: 'Geometric Fusion', description: 'Modern hexagonal pattern with mixed metals.', image: getBangleMainImage(27), category: 'Modern', images: getBangleImages(27) },
  { id: 28, name: 'Jadestone Jade', description: 'Imperial jade in traditional Chinese design.', image: getBangleMainImage(28), category: 'Traditional', images: getBangleImages(28) },
  { id: 29, name: 'Infinity Loop', description: 'Endless love symbol in white gold.', image: getBangleMainImage(29), category: 'Romantic', images: getBangleImages(29) },
  { id: 30, name: 'Tanzanite Twilight', description: 'Rare tanzanite with diamond surround.', image: getBangleMainImage(30), category: 'Luxury', images: getBangleImages(30) },
  { id: 31, name: 'Lotus Bloom', description: 'Sacred lotus design in 22K gold.', image: getBangleMainImage(31), category: 'Spiritual', images: getBangleImages(31) },
  { id: 32, name: 'Snake Charmer', description: 'Serpent-inspired design with ruby eyes.', image: getBangleMainImage(32), category: 'Contemporary', images: getBangleImages(32) },
  { id: 33, name: 'Aquamarine Wave', description: 'Ocean-blue aquamarine in flowing design.', image: getBangleMainImage(33), category: 'Bohemian', images: getBangleImages(33) },
  { id: 34, name: 'Hammered Warrior', description: 'Hand-hammered tribal pattern in brass.', image: getBangleMainImage(34), category: 'Tribal', images: getBangleImages(34) },
  { id: 35, name: 'Peridot Paradise', description: 'Fresh green peridot in spring-inspired design.', image: getBangleMainImage(35), category: 'Fresh', images: getBangleImages(35) },
  { id: 36, name: 'Byzantine Beauty', description: 'Byzantine chain pattern in yellow gold.', image: getBangleMainImage(36), category: 'Vintage', images: getBangleImages(36) },
  { id: 37, name: 'Starlight Sparkle', description: 'Star motif with scattered diamonds.', image: getBangleMainImage(37), category: 'Festive', images: getBangleImages(37) },
  { id: 38, name: 'Tribal Totem', description: 'African-inspired geometric patterns.', image: getBangleMainImage(38), category: 'Tribal', images: getBangleImages(38) },
  { id: 39, name: 'Cherry Blossom', description: 'Delicate sakura flowers in pink gold.', image: getBangleMainImage(39), category: 'Romantic', images: getBangleImages(39) },
  { id: 40, name: 'Celtic Knot', description: 'Traditional Celtic interlacing pattern.', image: getBangleMainImage(40), category: 'Heritage', images: getBangleImages(40) },
  { id: 41, name: 'Morganite Mist', description: 'Soft pink morganite in rose gold.', image: getBangleMainImage(41), category: 'Romantic', images: getBangleImages(41) },
  { id: 42, name: 'Dragon Scale', description: 'Textured scale pattern in oxidized silver.', image: getBangleMainImage(42), category: 'Fantasy', images: getBangleImages(42) },
  { id: 43, name: 'Constellation Map', description: 'Star chart engraving with tiny diamonds.', image: getBangleMainImage(43), category: 'Contemporary', images: getBangleImages(43) },
  { id: 44, name: 'Enamel Empress', description: 'Colorful enamel work in Mughal style.', image: getBangleMainImage(44), category: 'Traditional', images: getBangleImages(44) },
  { id: 45, name: 'Wave Rider', description: 'Ocean wave pattern in blue topaz.', image: getBangleMainImage(45), category: 'Nautical', images: getBangleImages(45) },
  { id: 46, name: 'Baroque Pearl', description: 'Irregular baroque pearls in gold wire.', image: getBangleMainImage(46), category: 'Artistic', images: getBangleImages(46) },
  { id: 47, name: 'Sunburst Ray', description: 'Radiating sun design in yellow diamonds.', image: getBangleMainImage(47), category: 'Festive', images: getBangleImages(47) },
  { id: 48, name: 'Victorian Lace', description: 'Delicate filigree work in white gold.', image: getBangleMainImage(48), category: 'Vintage', images: getBangleImages(48) },
  { id: 49, name: 'Mandala Meditation', description: 'Sacred geometry mandala pattern.', image: getBangleMainImage(49), category: 'Spiritual', images: getBangleImages(49) },
  { id: 50, name: 'Rainbow Brilliance', description: 'Multi-colored gemstones in spectrum order.', image: getBangleMainImage(50), category: 'Joyful', images: getBangleImages(50) },
];
