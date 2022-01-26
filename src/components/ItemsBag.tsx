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
        <div>
          {itemBag.map((item) => (
            <div key={item.key}>
              {item.label} X {item.quantity}
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
