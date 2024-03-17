import { FaStar } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';
import { FaShop } from 'react-icons/fa6';

import { Button } from '@/components/ui/Button';

import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

const ProductCard = ({ imgSrc, name, price, rating = 0, children, id }) => {
  return (
    <div className="overflow-hidden rounded-xl border-[1px] drop-shadow-sm bg-card">
      <TooltipProvider>
        <Link to={`/product/${id}`}>
          <img
            src={imgSrc}
            alt="Card 1 image"
            className="h-[200px] w-full cursor-pointer object-cover "
          />
        </Link>
        <div className="relative flex h-[140px] flex-col gap-[2px] p-2">
          <Tooltip>
            <TooltipTrigger className="text-left">
              <Link
                className="line-clamp-2 cursor-pointer overflow-hidden text-ellipsis"
                to={`/product/${id}`}
              >
                {name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
          <p className="mb-1 text-lg font-semibold">{price}</p>
          {children}
          <div className="flex items-center gap-1">
            <FaStar size={15} className="text-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
          {/* <button className="absolute bottom-2 right-2 flex items-center rounded-md border border-black bg-white p-2 text-black transition-colors hover:bg-black hover:text-white">
          <MdAddShoppingCart />
        </button> */}
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-2 right-2"
          >
            <MdAddShoppingCart />
          </Button>
        </div>
      </TooltipProvider>
    </div>
  );
};

const Seller = ({ sellerLink, children }) => {
  return (
    <Link className="flex gap-1" to={sellerLink}>
      <FaShop className="text-blue-600" />
      <p className="line-clamp-1 w-[100px] text-xs font-medium hover:underline">
        {children}
      </p>
    </Link>
  );
};

ProductCard.Seller = Seller;

export default ProductCard;
