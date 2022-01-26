import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

import { ItemType } from '../data';

type CardProps = {
  item: ItemType;
  addToBag: (_item: ItemType) => void;
  removeFromBag: (_item: ItemType) => void;
};

const Card: React.FC<CardProps> = ({ item, addToBag, removeFromBag }) => {
  const [selectedQuan, setSelectedQuan] = useState(0);

  const handleAdd = () => {
    if (item.quantity === 0) return;

    setSelectedQuan((s) => s + 1);
    addToBag(item);
  };

  const handleDelete = () => {
    if (selectedQuan === 0) return;
    setSelectedQuan((s) => s - 1);
    removeFromBag(item);
  };

  return (
    <div>
      <div className="border rounded-md shadow-sm text-gray-600" key={item.key}>
        <div className="px-3 text-center">
          <div className="flex py-3 items-center justify-center">
            <span className="text-5xl">{item.icon}</span>
          </div>
          <span className="inline-block w-full text-sm font-medium ">{item.label}</span>
          <span className="text-sm">Rs. {item.price}</span>
        </div>
        <div className="w-full text-sm bg-green-300 text-center mt-2 rounded-b-md">
          <span className="font-medium text-gray-700">{item.quantity - item.sold}</span>{' '}
          Items Left
        </div>
      </div>
      <div className="flex items-stretch justify-between mt-2">
        <button className="bg-yellow-200 rounded-full text-gray-700" onClick={handleAdd}>
          <PlusSmIcon className="h-5 w-5" />
        </button>
        <span>{selectedQuan}</span>
        <button
          className="bg-yellow-200 rounded-full text-gray-700"
          onClick={handleDelete}>
          <MinusSmIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Card;
