import { FaStar } from 'react-icons/fa';
import { MdAddShoppingCart } from 'react-icons/md';

const HomePage = () => {
  return (
    <div className="mt-5 flex w-full gap-5">
      <div className="flex w-[20%] flex-col gap-2">
        <h1>Filter</h1>
        <div className="rounded-md bg-white p-2">
          <h2>Category</h2>
        </div>
      </div>
      <div className="flex w-[80%] flex-col gap-2">
        <h2>Product</h2>
        <div className="grid grid-cols-4 gap-5">
          <div className="overflow-hidden rounded-md bg-white">
            <img
              src="example-product1.jpg"
              alt="Card 1 image"
              className="h-[200px] w-full object-cover"
            />
            <div className="relative flex h-[140px] flex-col gap-[2px] p-2">
              <p className="line-clamp-2 overflow-hidden text-ellipsis">
                Xiaomi Poco X6 Pro 5G Resmi Indonesia 2024 Mantap Murah meriah
              </p>
              <p className="font-semibold">Rp. 5.499.000</p>
              <div className="flex items-center gap-1">
                <FaStar size={15} className="text-yellow-400" />
                <span>5.0</span>
              </div>
              <button className="absolute bottom-2 right-2 flex items-center rounded-md border border-black bg-white p-2 text-black transition-colors hover:bg-black hover:text-white">
                <MdAddShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
