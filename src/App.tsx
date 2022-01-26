import { useState } from 'react';

import Card from './components/Card';
import ItemsBag from './components/ItemsBag';
import { INITIAL_VENDING_DATA, ItemType } from './data';

type BagType = {
  key: string;
  quantity: number;
  total_price: number;
  label: string;
};

function App() {
  const [machineState, setMachineState] = useState(INITIAL_VENDING_DATA);
  const [bagState, setBagState] = useState<Array<BagType>>([]);

  const addToBag = (product: ItemType) => {
    const bagItem = bagState.find((item) => item.key === product.key);
    if (bagItem) {
      setBagState((prevState) =>
        prevState.map((item) => {
          if (item.key === bagItem.key)
            return {
              ...item,
              quantity: item.quantity + 1,
              total_price: item.total_price + product.price,
            };
          return item;
        })
      );
    } else {
      const newProduct = {
        key: product.key,
        quantity: 1,
        total_price: product.price,
        label: product.label,
      };

      setBagState((prevState) => [...prevState, newProduct]);
    }
    setMachineState((prevState) =>
      prevState.map((item) => {
        if (item.key === product.key) return { ...item, quantity: item.quantity - 1 };
        else return item;
      })
    );
  };

  const removeFromBag = (product: ItemType) => {
    setBagState((prevState) =>
      prevState.map((item) => {
        if (item.key === product.key)
          return {
            ...item,
            quantity: item.quantity - 1,
            total_price: item.total_price - product.price,
          };
        else return item;
      })
    );

    setMachineState((prevState) =>
      prevState.map((item) => {
        if (item.key === product.key) return { ...item, quantity: item.quantity + 1 };
        else return item;
      })
    );
  };

  return (
    <main className="min-h-screen max-w-2xl mx-auto">
      <header className="px-5 py-16 text-center">
        <h1 className="text-2xl font-medium text-slate-600">Vending Machine 💸</h1>
      </header>

      <section className="px-5">
        <div className="flex flex-wrap gap-8 justify-center">
          {machineState.map((item) => (
            <Card
              key={item.key}
              item={item}
              addToBag={addToBag}
              removeFromBag={removeFromBag}
            />
          ))}
        </div>

        <ItemsBag itemBag={bagState} />
      </section>
    </main>
  );
}

export default App;
