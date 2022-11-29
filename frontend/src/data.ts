import { Food } from './app/shared/models/Food';
import { Tag } from './app/shared/models/Tag';

export const sample_foods: Food[] = [
  {
    id: '1',
    name: 'Salmon Salad',
    cookTime: '20-30',
    price: 20,
    favorite: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/salmon-keto.jpg',
    tags: ['Salad', 'Keto', 'Lunch'],
  },
  {
    id: '2',
    name: 'Oat Breakfast',
    price: 10,
    cookTime: '10-15',
    favorite: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/oat-brekfast.jpg',
    tags: ['Oats', 'BreakFast'],
  },
  {
    id: '3',
    name: 'Smoothie Ananas',
    price: 5,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/smoothie-ananas.jpg',
    tags: ['Breakfast', 'Smoothie'],
  },
  {
    id: '4',
    name: 'Keto Pizza',
    price: 2,
    cookTime: '15-20',
    favorite: true,
    origins: ['italy', 'france'],
    stars: 3.3,
    imageUrl: 'assets/pizza.jpg',
    tags: ['Keto', 'Pizza'],
  },
  {
    id: '5',
    name: 'Breakfast in Jar',
    price: 11,
    cookTime: '10',
    favorite: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/breakfast-in-jar.jpg',
    tags: ['Breakfast'],
  },
  {
    id: '6',
    name: 'Smoothie Detox',
    price: 9,
    cookTime: '10-20',
    favorite: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/smothie-detox-min.jpg',
    tags: ['Breakfast', 'Smoothie', 'Detox'],
  },
  {
    id: '7',
    name: 'Brownie',
    price: 5,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/dessert-brownie.jpg',
    tags: ['Dessert'],
  },
  {
    id: '8',
    name: 'Candies',
    price: 5,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/dessert-candy.jpg',
    tags: ['Dessert'],
  },
];

export const sample_tags: Tag[] = [
  { name: 'All', count: 8 },
  { name: 'Breakfast', count: 3 },
  { name: 'Pizza', count: 1 },
  { name: 'Lunch', count: 1 },
  { name: 'Keto', count: 2 },
  { name: 'Smoothie', count: 2 },
  { name: 'Dessert', count: 2 },
  { name: 'Detox', count: 1 },
];
