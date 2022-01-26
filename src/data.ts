export type ItemType = {
  label: string;
  key: string;
  quantity: number;
  icon: string;
  sold: number;
  price: number;
};

export const INITIAL_VENDING_DATA: Array<ItemType> = [
  {
    label: 'Chocolate',
    key: 'chocolate',
    quantity: 5,
    icon: '🍫',
    sold: 0,
    price: 10,
  },
  {
    label: 'Juice',
    key: 'juice',
    quantity: 5,
    icon: '🧃',
    sold: 0,
    price: 10,
  },
  {
    label: 'Oranges',
    key: 'orange',
    quantity: 5,
    icon: '🍊',
    sold: 0,
    price: 10,
  },
  {
    label: 'Ice Cream',
    key: 'ice-cream',
    quantity: 5,
    icon: '🍨',
    sold: 0,
    price: 10,
  },
];
