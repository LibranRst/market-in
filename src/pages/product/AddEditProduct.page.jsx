// React Core
import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import ProductActionCard from '../../components/ui/product/Product-ActionCard';
import { toast } from 'sonner';

// React Quill
const ReactQuill = lazy(() => import('react-quill'));

const AddProductPage = ({ mode = 'add' }) => {
  const [description, setDescription] = useState('');

  const { product, isLoading: isProductLoading } = useProduct();
  const { user, isLoading: isUserLoading } = useUser();
  const { addProduct, isAdding } = useAddProduct();
  const { updateProduct, isUpdating } = useUpdateProduct(product?.id);

  const navigate = useNavigate();

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
      category: mode === 'edit' ? product?.category : '',
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

  const onSubmit = ({ name, price, stock, category, image }) => {
    const imageFile = image[0];

    if (mode === 'edit') {
      if (
        name === product?.name &&
        price === product?.price &&
        stock === product?.stock &&
        category === product?.category &&
        description === product?.description &&
        !imageFile
      ) {
        toast('No changes made.');
        return;
      }
      updateProduct({
        name,
        description,
        price,
        stock,
        category,
        imageFile,
        imageUrl: product?.image_url,
        imageFileName: product?.image_filename,
      });
    }

    if (mode === 'add') {
      if (!name || !price || !stock || !category || !image) return;
      if (!description) return;
      addProduct(
        {
          name,
          description,
          price,
          stock,
          category,
          imageFile,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    }
  };
  return (
    <div className="mt-7 flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DynamicBreadcrumb
          pageName={mode === 'edit' ? product?.name : 'Add Product'}
        />
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
                  <Controller
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
                  />
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
