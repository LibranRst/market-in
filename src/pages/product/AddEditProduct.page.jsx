// React Core
import { lazy, Suspense, useEffect, useState } from 'react';

// Third-Party Libraries
import { Controller, useForm } from 'react-hook-form';

// Components
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Input } from '../../components/ui/Input';
import Spinner from '../../components/ui/loading/Spinner';
import ProductImageUpload from '../../components/ui/product/Product-ImageUpload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select';

// Hooks
import { useUser } from '../../hooks/auth/useUser';
import { useAddProduct } from '../../hooks/products/useAddProduct';
import { useProduct } from '../../hooks/products/useProduct';
import { useUpdateProduct } from '../../hooks/products/useUpdateProduct';
import useImagePreview from '../../hooks/use-imagepreview';

// Utils
import 'react-quill/dist/quill.bubble.css';
import { toast } from 'sonner';
import ProductActionCard from '../../components/ui/product/Product-ActionCard';
import CategorySelect from '../../components/ui/profile/Categories-select';
import { useCategories } from '../../hooks/categories/useCategories';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/Popover';
import { Separator } from '../../components/ui/Separator';

// React Quill
const ReactQuill = lazy(() => import('react-quill'));

const AddProductPage = ({ mode = 'add' }) => {
  const [description, setDescription] = useState('');

  const { product, isLoading: isProductLoading } = useProduct();
  const { isLoading: isUserLoading } = useUser();
  const { categories } = useCategories();
  const { addProduct, isAdding } = useAddProduct();
  const { updateProduct, isUpdating } = useUpdateProduct(product?.id);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    values: {
      name: mode === 'edit' ? product?.name : '',
      price: mode === 'edit' ? product?.price : 0,
      stock: mode === 'edit' ? product?.stock : '',
      categories: mode === 'edit' ? product?.categories : [],
    },
    defaultValues: {
      price: 0,
    },
  });

  const imageData = watch('image');
  const [imagePreview] = useImagePreview(imageData, product?.image_url);

  useEffect(() => {
    if (mode === 'edit') {
      setDescription(product?.description);
    }
  }, [mode, product]);

  if (mode === 'edit') {
    if (isProductLoading || isUserLoading) return <div>Loading...</div>;
    // if (!product?.$permissions[1].includes(user?.accountId)) navigate('/');
  }

  const onSubmit = ({ name, price, stock, image }) => {
    const imageFile = image[0];

    const categories = selectedCategories.map((category) => category.name);
    console.log(categories);

    // if (mode === 'edit') {
    //   if (
    //     name === product?.name &&
    //     price === product?.price &&
    //     stock === product?.stock &&
    //     category === product?.category &&
    //     description === product?.description &&
    //     !imageFile
    //   ) {
    //     toast('No changes made.');
    //     return;
    //   }
    //   updateProduct({
    //     name,
    //     description,
    //     price,
    //     stock,
    //     category,
    //     imageFile,
    //     imageUrl: product?.image_url,
    //     imageFileName: product?.image_filename,
    //   });
    // }

    // if (mode === 'add') {
    //   if (!name || !price || !stock || !category || !image) return;
    //   if (!description) return;
    //   addProduct(
    //     {
    //       name,
    //       description,
    //       price,
    //       stock,
    //       category,
    //       imageFile,
    //     },
    //     {
    //       onSuccess: () => {
    //         reset();
    //       },
    //     },
    //   );
    // }
  };
  return (
    <div className="flex flex-col gap-5">
      <DynamicBreadcrumb
        pageName={mode === 'edit' ? product?.name : 'Add Product'}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-12 gap-10">
          <ProductImageUpload
            errors={errors}
            imagePreview={imagePreview}
            register={register}
            mode={mode}
          />
          <div className="col-span-5 flex flex-col gap-10 py-2">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your product name.."
                className={`border-b ${errors?.name && 'border-destructive'} bg-transparent text-3xl font-bold focus:outline-none`}
                {...register('name', {
                  required: 'Product Name is required.',
                })}
              />
              <div className="text-md flex flex-row gap-2 font-normal">
                <div className="flex flex-wrap gap-1 text-card-foreground/70">
                  <Popover>
                    <PopoverTrigger>Categories</PopoverTrigger>
                    <PopoverContent>
                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <h4 className="font-medium leading-none">
                            Categories
                          </h4>
                          <div className="text-sm text-muted-foreground"></div>
                        </div>
                        <Separator className="my-1" />
                        <div className="flex flex-wrap gap-1">
                          {categories?.map((category) => (
                            <div
                              className={`relative cursor-pointer ${selectedCategories.includes(category) ? 'bg-primary  text-primary-foreground' : 'bg-transparent hover:bg-accent'} rounded-xl border border-input p-3 text-sm transition-all active:scale-90 `}
                              key={category.id}
                            >
                              <label>{category.name}</label>
                              <input
                                type="checkbox"
                                id={`category`}
                                className={`absolute left-0  h-full w-full cursor-pointer opacity-0`}
                                checked={selectedCategories.includes(category)}
                                value={category}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCategories([
                                      ...selectedCategories,
                                      category,
                                    ]);
                                  } else {
                                    setSelectedCategories(
                                      selectedCategories.filter(
                                        (c) => c !== category,
                                      ),
                                    );
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {/* <Controller
                    control={control}
                    name="category"
                    rules={{
                      required: 'Category of the product is required.',
                    }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger
                          className={errors?.category && 'border-destructive'}
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent ref={field.ref}>
                          <SelectItem value="Phones">Phones</SelectItem>
                          <SelectItem value="PC">PC</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  /> */}
                </div>
                <Input
                  placeholder="Stock"
                  type="number"
                  className={`w-[70px] ${errors?.stock && 'border-destructive'} rounded-xl  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                  {...register('stock', {
                    required: 'Stock of the product is required.',
                    min: {
                      value: 1,
                      message: 'Products must have at least 1 stock.',
                    },
                    valueAsNumber: true,
                    onChange: (e) => {
                      const newQuantity = parseInt(e.target.valueAsNumber);
                      if (newQuantity < 1) {
                        setValue('stock', 1);
                      } else {
                        setValue('stock', newQuantity);
                      }
                    },
                  })}
                  onKeyDown={(e) => {
                    if (e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {/* <p className="text-2xl font-normal">{formatCurrency(12000000)}</p> */}
              <div>
                <label htmlFor="stock" className="text-2xl font-normal">
                  Rp{' '}
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className={`w-fit border-b ${errors?.price && 'border-destructive'} bg-transparent text-2xl font-normal focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                  {...register('price', {
                    required: 'Price of the product is required.',
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: 'Products must have at least 1 price.',
                    },
                    onChange: (e) => {
                      const newQuantity = parseInt(e.target.valueAsNumber);
                      setValue('price', newQuantity);
                    },
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative flex flex-col gap-5 text-lg">
                <div>
                  <h2 className="font-medium">Description</h2>
                  <div className="mt-0.5 h-[2px] w-[50%] bg-primary" />
                </div>
                <Suspense fallback={<Spinner className="h-8 w-8" />}>
                  <ReactQuill
                    className="min-h-[220px]"
                    theme="bubble"
                    placeholder="Product description..."
                    formats={[
                      'bold',
                      'italic',
                      'underline',
                      'code',
                      'header',
                      'list',
                    ]}
                    modules={{
                      toolbar: [
                        ['bold', 'italic', 'underline', 'code'],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: 'bullet' }],
                      ],
                    }}
                    value={description}
                    onChange={setDescription}
                  />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="col-span-3 h-full">
            <ProductActionCard
              mode={mode}
              isAdding={isAdding}
              isUpdating={isUpdating}
              product={product}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
