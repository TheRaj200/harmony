import { createSlice } from '@reduxjs/toolkit';

// प्रोडक्ट्स डेटा Products.jsx से
const productShowcase = [
  { 
    id:1,
    main: '/images/c2.png',
    bg: '/images/c6.png',
    name:'Harmony Rabri Elachi Bar',
    alt: 'Classic Chocolate Bar',
    price:249,
    entry: { scale: 0.6, rotate: -15, opacity: 0, transition: { duration: 2, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -15, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {
     id:2,
    main: '/images/nut1.png',
    bg: '/images/nut2.png',
    alt: 'Nutty Crunch',
    name: 'Harmony Nutty Forest Bar',
    price:249,
    entry: { scale: 0.6, rotate: 10, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 10, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
    bgClass: 'rotate-180',
  },
  {
     id:3,
    main: '/images/berry1.png',
    bg: '/images/berry2.png',
    alt: 'Berry Bliss',
    name: 'Harmony Tang Berry Bar',
    price:249,
    entry: { scale: 0.6, rotate: 15, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 15, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  { 
    id:4,    
    main: '/images/bar1.png',
    bg: '/images/c3.png',
    alt: 'Harmony Crunch Chocolate Bar',
    name: 'Harmony Crunch  Bar',
    price:249,
    entry: { scale: 0.6, rotate: -10, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -10, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {
     id:5,
    main: '/images/c2.png',
    bg: '/images/c6.png',
    alt: 'Nutty Crunch',
 name:'Harmony Rabri Elachi Bar',
    price:249,
    entry: { scale: 0.6, rotate: 8, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 8, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {  id:6,
      main: '/images/nut1.png',
    bg: '/images/nut2.png',
 alt: 'Nutty Crunch',
    name: 'Harmony Nutty Forest Bar',
    price:249,
    entry: { scale: 0.6, rotate: -8, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -8, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {  id:7,
      main: '/images/berry1.png',
    bg: '/images/berry2.png',
   alt: 'Berry Bliss',
     name: 'Harmony Tang Berry Bar',
    price:249,
    entry: { scale: 0.6, rotate: 12, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 12, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {  id:8,
   main: '/images/bar1.png',
    bg: '/images/c3.png',
   alt: 'Signature Bar',
     name: 'Harmony Crunch  Bar',
    price:249,
    entry: { scale: 0.6, rotate: -12, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -12, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
];


const makhanaShowcase = [
  {  id:9,
    main: '/images/mk1.png',
    bg: '/images/mkbg.png',
    name: 'Harmony Mint & Pudhina Flavored Makhana',
    alt: 'Harmony Mint & Pudhina  Makhana',
    price: 249,
    originalPrice: 349,
    entry: { scale: 0.6, rotate: -15, opacity: 0, transition: { duration: 2, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -15, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {  id:10,
    main: '/images/mk2.png',
    bg: '/images/mkbg2.png',
    alt: 'Harmony Onion & Cheese Flavored Makhana',
    name: 'Harmony Onion & Cheese  Makhana',
    price: 249,
    originalPrice: 349,
    entry: { scale: 0.6, rotate: 10, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 10, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
    bgClass: 'rotate-180',
  },
  {  id:11,
    main: '/images/mk3.png',
    bg: '/images/mkbg3.png',
    alt: 'Harmony Peri Peri Flavored Makhana',
    name: 'Harmony Peri Peri  Makhana',
    price: 249,
    originalPrice: 349,
    entry: { scale: 0.6, rotate: 15, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 15, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {  id:12,
    main: '/images/mk1.png',
    bg: '/images/mkbg.png',
    alt: 'Premium Makhana',
    name: 'Harmony Mint & Pudhina  Makhana',
    price: 249,
    entry: { scale: 0.6, rotate: -10, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -10, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
    {  id:13,
    main: '/images/mk1.png',
    bg: '/images/mkbg2.png',
    name: 'Harmony Onion & Cheese Makhana',
    alt: 'Classic Makhana',
    price: 299,
    entry: { scale: 0.6, rotate: -15, opacity: 0, transition: { duration: 2, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: -15, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
  },
  {  id:14,
    main: '/images/mk2.png',
    bg: '/images/mkbg3.png',
    alt: 'Spicy Makhana',
    name: 'Harmony Peri Peri  Makhana',
    price: 219,
    entry: { scale: 0.6, rotate: 10, opacity: 0, transition: { duration: 1, type: 'spring', bounce: 0.45 } },
    exit: { scale: 0.6, rotate: 10, opacity: 0, transition: { duration: 0.7, ease: 'easeIn' } },
    bgClass: 'rotate-180',
  },
 
];

// विस्तृत प्रोडक्ट डेटा
const productDetailsData = [
  {
    id: 1,
    name: "Harmony Rabri Elachi Bar",
    price: 249,
    originalPrice: 300,
    desc: "Get a Taste of Royal Elegance: Authentic Elaichi Paired with Fresh Rabri Delights!",
    image: '/images/c2.png', 
    details: [
        "Experience the rich, creamy essence of traditional Rabdi infused with aromatic cardamom.",
        "Each bite delivers the nostalgic sweetness and warmth of this beloved Indian dessert.",
        "A luxurious treat that captures the essence of India’s street food culture."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Milk Solids (22%), Rabri Essence, Elachi, Sugar, Permitted Emulsifiers (E322, E476), Added Natural and Artificial Flavoring Substances - Vanilla"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},
{
    id: 2, 
    name: "Harmony Nutty Forest Bar",
    price: 249,
    originalPrice: 300,
    desc: "Get Sassy with Foxnuts: The Cocoa-Engraved Crunch for Healthy Snacking!",
    image: '/images/nut1.png', 
    details: [
        "A delightful blend of smooth chocolate and crunchy makhana.",
        "Combines the wholesome goodness of nuts with the rich, velvety texture of premium chocolate.",
        "Offers a perfect balance of taste and crunch."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Cocoa Solids, Sugar, Fox Nuts, Milk Solids (22%), Cocoa Butter, Permitted Emulsifiers (INS 422, INS 476), Added Cocoa and Vanilla Flavors"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},
{
    id: 3, 
    name: "Harmony Tang Berry Bar",
    price: 249,
    originalPrice: 300,
    desc: "Berry Blast: A Twist of Tanginess in Every Bite!",
    image: '/images/berry1.png', 
    details: [
        "Delight in the tangy, spicy kick of Khatti Methi, blending sweet and sour flavors with a touch of aromatic spices.",
        "This bold, distinctive flavor reflects the lively essence of India’s street food scene.",
        "A daring treat that balances zesty tang with a hint of sweetness."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Cocoa Solids, Dehydrated Fruits, Sugar, Milk Solids (22%), Permitted Emulsifiers (422,476), Added Cocoa and Vanilla Flavors"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},
{
    id: 4, 
    name: "Harmony Crunch Chocolate Bar",
    price: 249,
    originalPrice: 300,
    desc: "Experience the Ultimate Crunchiness in Every Bite of our Rice Crispies Chocolate Bar!",
    image: '/images/bar1.png', 
    details: [
        "Features crispy rice puffs embedded in luscious chocolate.",
        "Each bite bursts with a satisfying crunch.",
        "Ideal for those who enjoy a playful twist to their chocolate experience."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Cocoa Solids, Sugar, Rice Krispies, Salt, Natural Vanilla Flavor, Permitted Emulsifiers (INS 422, INS 476), Added Cocoa and Vanilla Flavors"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},

  {
    id: 5,
    name: "Harmony Rabri Elachi Bar",
    price: 249,
    originalPrice: 300,
    desc: "Get a Taste of Royal Elegance: Authentic Elaichi Paired with Fresh Rabri Delights!",
    image: '/images/c2.png', 
    details: [
        "Experience the rich, creamy essence of traditional Rabdi infused with aromatic cardamom.",
        "Each bite delivers the nostalgic sweetness and warmth of this beloved Indian dessert.",
        "A luxurious treat that captures the essence of India’s street food culture."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Milk Solids (22%), Rabri Essence, Elachi, Sugar, Permitted Emulsifiers (E322, E476), Added Natural and Artificial Flavoring Substances - Vanilla"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},
{
    id: 6, 
    name: "Harmony Nutty Forest Bar",
    price: 249,
    originalPrice: 300,
    desc: "Get Sassy with Foxnuts: The Cocoa-Engraved Crunch for Healthy Snacking!",
    image: '/images/nut1.png', 
    details: [
        "A delightful blend of smooth chocolate and crunchy makhana.",
        "Combines the wholesome goodness of nuts with the rich, velvety texture of premium chocolate.",
        "Offers a perfect balance of taste and crunch."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Cocoa Solids, Sugar, Fox Nuts, Milk Solids (22%), Cocoa Butter, Permitted Emulsifiers (INS 422, INS 476), Added Cocoa and Vanilla Flavors"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},
{
    id: 7, 
    name: "Harmony Tang Berry Bar",
    price: 249,
    originalPrice: 300,
    desc: "Berry Blast: A Twist of Tanginess in Every Bite!",
    image: '/images/berry1.png', 
    details: [
        "Delight in the tangy, spicy kick of Khatti Methi, blending sweet and sour flavors with a touch of aromatic spices.",
        "This bold, distinctive flavor reflects the lively essence of India’s street food scene.",
        "A daring treat that balances zesty tang with a hint of sweetness."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Cocoa Solids, Dehydrated Fruits, Sugar, Milk Solids (22%), Permitted Emulsifiers (422,476), Added Cocoa and Vanilla Flavors"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},
{
    id: 8, 
    name: "Harmony Crunch Chocolate Bar",
    price: 249,
    originalPrice: 300,
    desc: "Experience the Ultimate Crunchiness in Every Bite of our Rice Crispies Chocolate Bar!",
    image: '/images/bar1.png', 
    details: [
        "Features crispy rice puffs embedded in luscious chocolate.",
        "Each bite bursts with a satisfying crunch.",
        "Ideal for those who enjoy a playful twist to their chocolate experience."
    ],

    accordionData: [
        {
            title: "Ingredients",
            content: "Cocoa Solids, Sugar, Rice Krispies, Salt, Natural Vanilla Flavor, Permitted Emulsifiers (INS 422, INS 476), Added Cocoa and Vanilla Flavors"
        },
        {
            title: "Allergen Information",
            content: "Contains Milk & Soy (Lecithin of Soya origin)"
        },
        {
            title: "Net Weight",
            content: "80g (approx)"
        }
    ]
},

  { 
    id: 9, 
    name: "Harmony Mint & Pudhina Flavored Makhana", 
    price: 249, 
    originalPrice: 349, 
    desc: "Refresh your taste buds with the cool, zesty flavors of mint and pudhina in our Harmony Mint & Pudhina Flavored Makhana, roasted in olive oil for a light and healthy crunch.", 
    image: '/images/mk1.png', 
    details: [ 
      "Roasted in Olive Oil: A healthier, crispier snack option that's light on calories.", 
      "Low-Calorie, Guilt-Free: A refreshing, flavorful snack you can enjoy without any guilt.", 
      "Packed with Protein & Fiber: Keeps you feeling satisfied and energized throughout the day.", 
      "Gluten-Free & Vegan: Ideal for those following plant-based or gluten-free diets.", 
      "Perfect for a light, refreshing snack anytime — adds a touch of freshness to your routine." 
    ], 
    accordionData: [ 
      { 
        title: "Ingredients", 
        content: "Foxnuts (Makhana), Olive Oil, Spices & Condiments (Red Chilli, Dried Garlic, Dried Onion, Cumin, Dried Mango Powder, Mint leaves, Dried Ginger, Clove, Cinnamon, Black Pepper, Nutmeg), Iodised Salt, Sugar, Acidifying Agent (Citric Acid)" 
      }, 
      { 
        title: "Allergen Information", 
        content: "Contains Tree Nuts. This product has been packed in an integrated nuts & dried fruits processing unit and may contain an occasional trace of other nuts or dried fruits" 
      }, 
      { 
        title: "Net Weight", 
        content: "85g (approx)" 
      } 
    ] 
  }, 
  { 
    id: 10, 
    name: "Harmony Onion & Cheese Flavored Makhana", 
    price: 249, 
    originalPrice: 349, 
    desc: "Indulge in the irresistible blend of savory onion and rich, creamy cheese with our Harmony Onion & Cheese Flavored Makhana, roasted to perfection in olive oil.", 
    image: '/images/mk2.png', 
    details: [ 
      "Roasted in Olive Oil: A healthier choice that gives you the perfect crunch without the guilt.", 
      "Low-Calorie, Guilt-Free: Satisfy your cheese cravings while keeping your calorie count in check.", 
      "Rich in Protein & Fiber: Keeps you feeling full and energized throughout the day.", 
      "Gluten-Free & Vegetarian: A snack that fits into various dietary preferences.", 
      "Perfect balance of flavor and nutrition — ideal for movie nights or on-the-go cravings." 
    ], 
    accordionData: [ 
      { 
        title: "Ingredients", 
        content: "Foxnuts (Makhana), Olive Oil, Spices & Condiments (Yellow Chilli, Onion, Parsley, Cheese, Salt, Sugar, Acidifying Agent (Malic Acid))" 
      }, 
      { 
        title: "Allergen Information", 
        content: "Contains Tree Nuts. This product has been packed in an integrated nuts & dried fruits processing unit and may contain an occasional trace of other nuts or dried fruits" 
      }, 
      { 
        title: "Net Weight", 
        content: "85g (approx)" 
      } 
    ] 
  }, 
  { 
    id: 11, 
    name: "Harmony Peri Peri Flavored Makhana", 
    price: 249, 
    originalPrice: 349, 
    desc: "Experience the perfect harmony of health and flavor with our Harmony Peri Peri Flavored Makhana, roasted to perfection in heart-healthy olive oil.", 
    image: '/images/mk3.png', 
    details: [ 
      "Roasted in Olive Oil: A healthier alternative to fried snacks, providing a rich source of good fats.", 
      "Low-Calorie, Guilt-Free: Enjoy your favorite spicy snack without worrying about extra calories.", 
      "Rich in Protein & Fiber: A wholesome option to keep you feeling full and energized.", 
      "Gluten-Free & Vegan: Perfect for those with dietary restrictions.", 
      "Ideal for anytime snacking — a spicy, satisfying treat that supports a balanced, health-conscious lifestyle." 
    ], 
    accordionData: [ 
      { 
        title: "Ingredients", 
        content: "Foxnuts (Makhana), Olive Oil, Spices & Condiments (Red Chilli, Dried Garlic, Dried Onion, Cumin, Dried Mango Powder, Coriander seeds, Dried Ginger, Turmeric, Carom Seeds, Black Pepper, Cinnamon, Fenugreek Seeds, Nutmeg, Mace), Acidifying Agent (Citric Acid), Colour (Paprika Extract), Flavour Enhancer (INS 635)" 
      }, 
      { 
        title: "Allergen Information", 
        content: "Contains Tree Nuts. This product has been packed in an integrated nuts & dried fruits processing unit and may contain an occasional trace of other nuts or dried fruits" 
      }, 
      { 
        title: "Net Weight", 
        content: "85g (approx)" 
      } 
    ] 
  },
   { 
    id: 12, 
    name: "Harmony Mint & Pudhina Flavored Makhana", 
    price: 249, 
    originalPrice: 349, 
    desc: "Refresh your taste buds with the cool, zesty flavors of mint and pudhina in our Harmony Mint & Pudhina Flavored Makhana, roasted in olive oil for a light and healthy crunch.", 
    image: '/images/mk1.png', 
    details: [ 
      "Roasted in Olive Oil: A healthier, crispier snack option that's light on calories.", 
      "Low-Calorie, Guilt-Free: A refreshing, flavorful snack you can enjoy without any guilt.", 
      "Packed with Protein & Fiber: Keeps you feeling satisfied and energized throughout the day.", 
      "Gluten-Free & Vegan: Ideal for those following plant-based or gluten-free diets.", 
      "Perfect for a light, refreshing snack anytime — adds a touch of freshness to your routine." 
    ], 
    accordionData: [ 
      { 
        title: "Ingredients", 
        content: "Foxnuts (Makhana), Olive Oil, Spices & Condiments (Red Chilli, Dried Garlic, Dried Onion, Cumin, Dried Mango Powder, Mint leaves, Dried Ginger, Clove, Cinnamon, Black Pepper, Nutmeg), Iodised Salt, Sugar, Acidifying Agent (Citric Acid)" 
      }, 
      { 
        title: "Allergen Information", 
        content: "Contains Tree Nuts. This product has been packed in an integrated nuts & dried fruits processing unit and may contain an occasional trace of other nuts or dried fruits" 
      }, 
      { 
        title: "Net Weight", 
        content: "85g (approx)" 
      } 
    ] 
  }, 
  { 
    id: 13, 
    name: "Harmony Onion & Cheese Flavored Makhana", 
    price: 249, 
    originalPrice: 349, 
    desc: "Indulge in the irresistible blend of savory onion and rich, creamy cheese with our Harmony Onion & Cheese Flavored Makhana, roasted to perfection in olive oil.", 
    image: '/images/mk2.png', 
    details: [ 
      "Roasted in Olive Oil: A healthier choice that gives you the perfect crunch without the guilt.", 
      "Low-Calorie, Guilt-Free: Satisfy your cheese cravings while keeping your calorie count in check.", 
      "Rich in Protein & Fiber: Keeps you feeling full and energized throughout the day.", 
      "Gluten-Free & Vegetarian: A snack that fits into various dietary preferences.", 
      "Perfect balance of flavor and nutrition — ideal for movie nights or on-the-go cravings." 
    ], 
    accordionData: [ 
      { 
        title: "Ingredients", 
        content: "Foxnuts (Makhana), Olive Oil, Spices & Condiments (Yellow Chilli, Onion, Parsley, Cheese, Salt, Sugar, Acidifying Agent (Malic Acid))" 
      }, 
      { 
        title: "Allergen Information", 
        content: "Contains Tree Nuts. This product has been packed in an integrated nuts & dried fruits processing unit and may contain an occasional trace of other nuts or dried fruits" 
      }, 
      { 
        title: "Net Weight", 
        content: "85g (approx)" 
      } 
    ] 
  }, 
  { 
    id: 14, 
    name: "Harmony Peri Peri Flavored Makhana", 
    price: 249, 
    originalPrice: 349, 
    desc: "Experience the perfect harmony of health and flavor with our Harmony Peri Peri Flavored Makhana, roasted to perfection in heart-healthy olive oil.", 
    image: '/images/mk3.png', 
    details: [ 
      "Roasted in Olive Oil: A healthier alternative to fried snacks, providing a rich source of good fats.", 
      "Low-Calorie, Guilt-Free: Enjoy your favorite spicy snack without worrying about extra calories.", 
      "Rich in Protein & Fiber: A wholesome option to keep you feeling full and energized.", 
      "Gluten-Free & Vegan: Perfect for those with dietary restrictions.", 
      "Ideal for anytime snacking — a spicy, satisfying treat that supports a balanced, health-conscious lifestyle." 
    ], 
    accordionData: [ 
      { 
        title: "Ingredients", 
        content: "Foxnuts (Makhana), Olive Oil, Spices & Condiments (Red Chilli, Dried Garlic, Dried Onion, Cumin, Dried Mango Powder, Coriander seeds, Dried Ginger, Turmeric, Carom Seeds, Black Pepper, Cinnamon, Fenugreek Seeds, Nutmeg, Mace), Acidifying Agent (Citric Acid), Colour (Paprika Extract), Flavour Enhancer (INS 635)" 
      }, 
      { 
        title: "Allergen Information", 
        content: "Contains Tree Nuts. This product has been packed in an integrated nuts & dried fruits processing unit and may contain an occasional trace of other nuts or dried fruits" 
      }, 
      { 
        title: "Net Weight", 
        content: "85g (approx)" 
      } 
    ] 
  }
];

const initialState = {
  productShowcase,
  makhanaShowcase,
  productDetailsData,
  hoverStates: {
    products: Array(productShowcase.length).fill(false),
    makhana: Array(makhanaShowcase.length).fill(false)
  },
  selectedProduct: null,
  productDetails: null
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductHover: (state, action) => {
      const { index, isHovered, type } = action.payload;
      if (type === 'products') {
        state.hoverStates.products = state.hoverStates.products.map((v, i) => 
          i === index ? isHovered : v
        );
      } else if (type === 'makhana') {
        state.hoverStates.makhana = state.hoverStates.makhana.map((v, i) => 
          i === index ? isHovered : v
        );
      }
    },
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      // Find product in either showcase
      const product = state.productShowcase.find(p => p.id === productId) || 
                     state.makhanaShowcase.find(p => p.id === productId);
      state.selectedProduct = product;
      
      // Find detailed product data if available
      const details = state.productDetailsData.find(p => p.id === productId);
      state.productDetails = details || null;
    },
    resetSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
});

export const { setProductHover, setSelectedProduct, resetSelectedProduct } = productSlice.actions;

export default productSlice.reducer;