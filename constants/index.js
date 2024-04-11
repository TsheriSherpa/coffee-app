export const categories = [
  {
    id: 0,
    title: "All"
  },
  {
    id: 1,
    title: "Blended"
  },
  {
    id: 2,
    title: "Cold Brew"
  },
  {
    id: 3,
    title: "French Press"
  },
  {
    id: 4,
    title: "Chemex"
  },
  // Add more categories as needed
];

export const coffeeItems = [
  {
    id: 1,
    name: 'Espresso',
    price: 2.99,
    volume: 'Single Shot',
    stars: 4.5,
    image: require('../assets/images/coffee5.png'),
    desc: 'A concentrated shot of coffee brewed by forcing hot water through finely-ground coffee beans.',
    cat_id: 1,
    in_cart: 0
  },
  {
    id: 2,
    name: 'Cappuccino',
    price: 3.99,
    volume: 'Regular',
    stars: 4.8,
    image: require('../assets/images/coffee1.png'),
    desc: 'An espresso-based coffee drink that is typically prepared with equal parts double espresso, steamed milk, and milk foam.',
    cat_id: 2,
    in_cart: 0
  },
  {
    id: 3,
    name: 'Latte',
    price: 4.49,
    volume: 'Large',
    stars: 4.7,
    image: require('../assets/images/coffee2.png'),
    desc: 'A coffee drink made with espresso and steamed milk, often topped with a small amount of milk foam.',
    cat_id: 3,
    in_cart: 0
  },
  {
    id: 4,
    name: 'Macchiato',
    price: 3.79,
    volume: 'Tall',
    stars: 4.6,
    image: require('../assets/images/coffee3.png'),
    desc: 'An espresso-based coffee beverage that is "stained" with a small amount of steamed milk.',
    cat_id: 4,
    in_cart: 0
  },
  {
    id: 5,
    name: 'Americano',
    price: 4.48,
    volume: 'Large',
    stars: 4.7,
    image: require('../assets/images/coffee4.png'),
    desc: 'A coffee drink made with espresso and steamed milk, often topped with a small amount of milk foam.',
    cat_id: 3,
    in_cart: 0
  },
  {
    id: 6,
    name: 'Mocha',
    price: 3.79,
    volume: 'Tall',
    stars: 4.6,
    image: require('../assets/images/coffee5.png'),
    desc: 'An espresso-based coffee beverage that is "stained" with a small amount of steamed milk.',
    cat_id: 4,
    in_cart: 0
  },
  {
    id: 7,
    name: 'Irish Coffee',
    price: 5.79,
    volume: 'Tall',
    stars: 4.6,
    image: require('../assets/images/coffee3.png'),
    desc: 'An espresso-based coffee beverage that is "stained" with a small amount of steamed milk.',
    cat_id: 4,
    in_cart: 0
  },
  {
    id: 8,
    name: 'Ristretto',
    price: 5.79,
    volume: 'Tall',
    stars: 4.6,
    image: require('../assets/images/coffee3.png'),
    desc: 'An espresso-based coffee beverage that is "stained" with a small amount of steamed milk.',
    cat_id: 1,
    in_cart: 0
  },
  {
    id: 9,
    name: 'Affogato',
    price: 2.79,
    volume: 'Tall',
    stars: 4.6,
    image: require('../assets/images/coffee2.png'),
    desc: 'An espresso-based coffee beverage that is "stained" with a small amount of steamed milk.',
    cat_id: 1,
    in_cart: 0
  }, 
  {
  id: 10,
  name: 'Doppio',
  price: 2.79,
  volume: 'Tall',
  stars: 4.6,
  image: require('../assets/images/coffee5.png'),
  desc: 'An espresso-based coffee beverage that is "stained" with a small amount of steamed milk.',
  cat_id: 2,
  in_cart: 0
},     
];
