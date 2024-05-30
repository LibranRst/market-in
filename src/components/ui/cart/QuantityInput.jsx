import { cn } from '../../../lib/utils';
import { Button } from '../Button';

const QuantityInput = ({
  quantity,
  setQuantity,
  setError,
  product,
  className,
  onBlur,
  onChange = () => {},
  onNegative = () => {},
  onPositive = () => {},
}) => {
  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value).toFixed(0) || '';

    if (isNaN(newQuantity) || newQuantity < 1) {
      setQuantity('');
      setError('Quantity must be a valid number and greater than 0');
      return;
    }

    if (newQuantity > product?.stock) {
      setQuantity(product?.stock);
      setError(`Maximum quantity is ${product?.stock}`);
      return;
    }

    setQuantity(newQuantity);
    setError('');

    if (onChange) onChange(newQuantity);
  };

  const handleNegative = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((cur) => cur - 1);
    if (onNegative) onNegative();
  };

  const handlePositive = () => {
    if (quantity >= product?.stock) {
      return;
    }
    setQuantity((cur) => cur + 1);
    if (onPositive) onPositive();
  };

  const handleKeyDown = (e) => {
    const keysToPreventDefault = new Set(['e', '-', '+', '.']);
    // Prevent the default behavior of the these buttons
    if (keysToPreventDefault.has(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div className={cn('relative flex w-[5rem] items-center', className)}>
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
        className="h-[2.125rem] w-full rounded-xl border border-border bg-card p-2 text-center text-card-foreground [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        onChange={handleChange}
        value={quantity}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
      <Button
        className="absolute right-1 flex h-[25px] w-[25px] rounded-full  transition-colors"
        onClick={handlePositive}
        disabled={quantity >= product?.stock}
        size="icon"
        variant="ghost"
      >
        +
      </Button>
    </div>
  );
};

export default QuantityInput;
