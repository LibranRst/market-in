import { Controller, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { Button, buttonVariants } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import { Input } from '../../components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select';
import useImagePreview from '../../hooks/use-imagepreview';

import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css';
import Spinner from '../../components/ui/loading/Spinner';
import { useAddProduct } from '../../hooks/products/useAddProduct';
import { useProduct } from '../../hooks/products/useProduct';
import { useUser } from '../../hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';
import { useUpdateProduct } from '../../hooks/products/useUpdateProduct';
import { toast } from '../../hooks/use-toast';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { cn } from '../../lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/Popover';
import { TrashIcon } from '@radix-ui/react-icons';

const AddProductPage = ({ mode = 'add' }) => {
  const { product, isLoading: isProductLoading } = useProduct();
  const { user, isLoading: isUserLoading } = useUser();

  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const { addProduct, isAdding } = useAddProduct();
  const { updateProduct, isUpdating } = useUpdateProduct(product?.$id);
  const { deleteProduct, isDeleting } = useDeleteProduct();

  console.log(isAdding);

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
  const [imagePreview] = useImagePreview(imageData, product?.imageUrl);

  useEffect(() => {
    if (mode === 'edit') {
      setDescription(product?.description);
    }
  }, [mode, product]);

  if (mode === 'edit') {
    if (isProductLoading || isUserLoading) return <div>Loading...</div>;
    if (!product?.$permissions[1].includes(user?.accountId)) navigate('/');
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
        toast({
          title: 'No changes made',
          variant: 'destructive',
        });
        return;
      }
      updateProduct({
        name,
        description,
        price,
        stock,
        category,
        imageFile,
        imageUrl: product?.imageUrl,
        imageId: product?.imageId,
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
          <div className="col-span-4 h-full rounded-xl">
            <label
              htmlFor="image"
              className={`sticky top-[7.688rem] flex h-[375px] w-[375px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-transparent transition-colors hover:bg-accent-foreground/20 ${errors?.image ? 'border-destructive' : 'border-border'}`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="h-full w-full rounded-lg object-cover transition-opacity hover:opacity-50"
                />
              ) : (
                'Upload Product Image'
              )}
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                className="absolute top-0 hidden"
                {...register('image', {
                  required: mode === 'edit' ? false : 'Image is required.',
                })}
              />
            </label>
          </div>
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
              </div>
            </div>
          </div>
          <div className="col-span-3 h-full">
            <Card className="sticky top-[7.688rem]">
              <CardHeader className="p-4">
                <CardTitle>
                  {mode === 'edit' ? 'Edit Product Details' : 'Add New Product'}
                </CardTitle>
                <CardDescription>
                  {mode === 'edit'
                    ? 'Make changes to your product'
                    : 'Start selling by adding a product'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row gap-1 px-4">
                <Button
                  className="w-[calc(100%-2.25rem)]"
                  type="submit"
                  disabled={isAdding || isUpdating || isDeleting}
                >
                  {mode === 'edit' ? 'Save Changes' : 'Add Product'}{' '}
                  {isAdding || isUpdating ? (
                    <Spinner className="ml-1 h-4 w-4" />
                  ) : null}
                </Button>
                {mode === 'edit' && (
                  <Popover>
                    <PopoverTrigger
                      className={cn(
                        buttonVariants({
                          variant: 'destructive',
                          size: 'icon',
                        }),
                      )}
                      disabled={isDeleting || isUpdating}
                    >
                      <TrashIcon />
                    </PopoverTrigger>
                    <PopoverContent className="rounded-xl">
                      <p className="text-sm">
                        Are you sure you want to delete this product?
                      </p>
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          disabled={isDeleting}
                          onClick={() =>
                            deleteProduct(
                              {
                                productId: product.$id,
                                imageId: product.imageId,
                              },
                              {
                                onSuccess: () => {
                                  navigate('/profile');
                                },
                              },
                            )
                          }
                        >
                          {isDeleting ? (
                            <span>
                              Deleting
                              <Spinner className={'ml-1 h-4 w-4'} />{' '}
                            </span>
                          ) : (
                            'Confirm'
                          )}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
