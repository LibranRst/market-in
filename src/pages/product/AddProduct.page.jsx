import { Controller, useForm } from 'react-hook-form';
import DynamicBreadcrumb from '../../components/ui/Dynamic-breadcrumb';
import useImagePreview from '../../hooks/use-imagepreview';
import { formatCurrency } from '../../utils/helpers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.bubble.css';
import { useState } from 'react';
import { useAddProduct } from '../../hooks/products/useAddProduct';
import Spinner from '../../components/ui/loading/Spinner';

const AddProductPage = () => {
  const [description, setDescription] = useState('');
  const { addProduct, isAdding } = useAddProduct();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      price: 0,
    },
  });

  const imageData = watch('image');
  const [imagePreview] = useImagePreview(imageData);

  const onSubmit = ({ name, price, stock, category, image }) => {
    if (!name || !price || !stock || !category || !image) return;
    if (!description) return;
    const imageFile = image[0];
    console.log({ name, price, stock, category, imageFile, description });
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
  };
  return (
    <div className="mt-7 flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DynamicBreadcrumb pageName="Add Product" />
        <div className="grid w-full grid-cols-12 gap-10">
          <div className="col-span-4 h-full rounded-md">
            <label
              htmlFor="image"
              className={`sticky top-[7.688rem] block h-[375px] w-[375px] cursor-pointer rounded-md border-2 border-dashed bg-transparent transition-colors hover:bg-accent-foreground/20 ${errors?.image ? 'border-destructive' : 'border-border'}`}
            >
              <div className="flex h-full w-full items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="h-full w-full rounded-md object-cover transition-opacity hover:opacity-50"
                  />
                ) : (
                  'Upload Product Image'
                )}
              </div>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                className="absolute top-0 hidden"
                {...register('image', {
                  required: 'Image is required.',
                })}
              />
            </label>
          </div>
          <div className="col-span-5 flex flex-col gap-10 py-2">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="your product name.."
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
                  className={`w-[70px] ${errors?.stock && 'border-destructive'}  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
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
                <CardTitle>Add Product</CardTitle>
                <CardDescription>
                  Sell your product to customers
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <Button className="w-full" type="submit" disabled={isAdding}>
                  Confirm {isAdding && <Spinner className="ml-1 h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
