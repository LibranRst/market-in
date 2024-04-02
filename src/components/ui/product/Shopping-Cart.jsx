import { useState } from 'react';
import { formatCurrency } from '../../../utils/helpers';
import { Button } from '../Button';
import { Card } from '../Card';
import { Separator } from '../Separator';
const ShoppingCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const handleNegative = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((cur) => cur - 1);
  };

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value) || '';
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // reset quantity to empty input and set new value
      e.target.value = '';
      setQuantity(newQuantity);
      setError('');
    } else {
      setQuantity(0); // Reset to 1 if the input is invalid or less than 1
      setError('');
    }
    if (newQuantity > product?.stock) {
      setQuantity(product?.stock);
      setError('Max quantity is ' + product?.stock);
    }
    if (newQuantity <= 0) {
      setError('Minimum quantity of this product is 1');
    }
  };

  const handlePositive = () => {
    if (quantity >= product?.stock) {
      return;
    }
    setQuantity((cur) => cur + 1);
  };

  const onSubmit = () => {
    if (quantity <= 0) {
      setQuantity(1);
    }
  };

  return (
    <Card className="sticky top-[7.688rem] flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <Separator />
      </div>
      <div className="flex items-center gap-3">
        <div className="relative flex w-[40%] items-center">
          <Button
            className="absolute left-1 flex h-[25px] w-[25px] rounded-full  transition-colors "
            onClick={handleNegative}
            disabled={quantity <= 1}
            size="icon"
            variant="ghost"
          >
            -
          </Button>
          <input
            type="number"
            className="h-[2.125rem] w-full rounded-md border border-border bg-card p-2 text-center text-card-foreground [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={handleChange}
            value={quantity}
            onBlur={() => {
              if (quantity <= 0) {
                setQuantity(1);
                setError('')
              }
            }}
          />
          <Button
            className="absolute right-1 flex h-[25px] w-[25px] rounded-full  transition-colors "
            onClick={handlePositive}
            disabled={quantity >= product?.stock}
            size="icon"
            variant="ghost"
          >
            +
          </Button>
        </div>
        <h2 className="text-sm">Quantity</h2>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex flex-row items-center justify-between">
        <h2 className="font-light">Subtotal</h2>
        <h2 className="text-xl font-bold ">
          {formatCurrency(product.price * quantity)}
        </h2>
      </div>
      <Button onClick={onSubmit}>Add to cart</Button>
    </Card>
  );
};

export default ShoppingCart;
