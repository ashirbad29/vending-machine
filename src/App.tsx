import { useMemo, useState } from 'react';

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
  const [inputMoney, setInputMoney] = useState(0);
  const [change, setChange] = useState<{ note: number; no: number }[]>([]);

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

  const calculateCost = () => {
    return bagState.reduce((acc, item) => acc + item.total_price, 0);
  };

  const totalCost = useMemo(calculateCost, [bagState]);

  const handleChange = (cost: number) => {
    const arr = [500, 200, 100, 50, 20, 10, 5, 2, 1];
    const ss = [];

    let i = 0;
    while (i < arr.length && cost) {
      const noOfNote = Math.floor(cost / arr[i]);
      cost = cost % arr[i];
      if (noOfNote) ss.push({ note: arr[i], no: noOfNote });
      i++;
    }

    setChange(ss);
  };

  const handleBuy = () => {
    if (bagState.length === 0 || inputMoney === 0) return;

    const totalCost = bagState.reduce((acc, item) => acc + item.total_price, 0);

    if (totalCost > inputMoney) return;
    handleChange(inputMoney - totalCost);
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

        <div className="max-w-2xl mx-auto px-4 mt-7 text-center">
          <span>Total Cost: {totalCost} &#8377;</span>
        </div>

        <ItemsBag itemBag={bagState} />

        <div className="mt-5  max-w-2xl mx-auto px-8 flex justify-center gap-4">
          <input
            type="number"
            min={0}
            value={inputMoney}
            placeholder="anything...."
            onChange={(e) => setInputMoney(Number(e.target.value))}
            className="border px-3 rounded-md focus:outline-none focus:ring-2"
          />
          <button
            className="bg-green-400 px-3 py-1 rounded-md text-white"
            onClick={handleBuy}>
            Buy 🌟
          </button>
        </div>

        {change && change.length > 0 && (
          <div className="max-w-2xl mx-auto px-8 mt-5 flex gap-6 flex-wrap">
            {change.map((item) => (
              <div key={item.note} className="flex gap-4 bg-orange-300 px-2 rounded-md">
                <span>{item.note}</span>
                <span>{item.no}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
