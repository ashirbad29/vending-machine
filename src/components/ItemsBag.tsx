import { XIcon } from '@heroicons/react/solid';

type BagType = {
  key: string;
  quantity: number;
  total_price: number;
  label: string;
};

const ItemsBag = ({ itemBag }: { itemBag: Array<BagType> }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 px-8 border rounded-md py-4">
      {itemBag && itemBag.length > 0 ? (
        <div className="flex gap-2">
          {itemBag.map((item) => (
            <div
              key={item.key}
              className="border bg-green-300 px-2 rounded-md shadow-sm flex items-center gap-1 text-gray-700">
              {item.label} <XIcon className="h-4 w-4" /> {item.quantity}
            </div>
          ))}
        </div>
      ) : (
        <span> Bag is Empty! Try adding some items </span>
      )}
    </div>
  );
};

export default ItemsBag;
