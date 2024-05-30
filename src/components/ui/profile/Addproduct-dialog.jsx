import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAddProduct } from '../../../hooks/products/useAddProduct';
import useImagePreview from '../../../hooks/use-imagepreview';
import { Button } from '../Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog';
import FormRow from '../Formrow';
import { Input } from '../Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Textarea } from '../Textarea';
import Spinner from '../loading/Spinner';

const AddProductDialog = () => {
  const { addProduct, isAdding } = useAddProduct();

  const [open, setOpen] = useState(false);
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
      stock: 1,
    },
  });

  const imageData = watch('image');
  const [imagePreview, setImagePreview] = useImagePreview(imageData);

  useEffect(() => {
    if (!open) {
      reset();
      setImagePreview(null);
    }
  }, [open, reset, setImagePreview]);

  const onSubmit = ({ name, description, price, category, image, stock }) => {
    if (!image || !name || !description || !price) return;
    // const selectedCategories = categories
    //   ? Object.entries(categories)
    //       .filter(([, isSelected]) => isSelected)
    //       .map(([category]) => category)
    //   : [];

    const imageFile = image[0];
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
          setOpen(false);
          setImagePreview(null);
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Product</DialogTitle>
            <DialogDescription>
              Add a new product to your shop.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormRow label="Name" error={errors.name} htmlFor="name">
              <Input
                id="name"
                placeholder="Name of your product..."
                {...register('name', {
                  required: 'Name of the product is required.',
                })}
              />
            </FormRow>
            <FormRow
              label="Description"
              error={errors.description}
              htmlFor="description"
            >
              <Textarea
                id="description"
                placeholder="Description of your product..."
                {...register('description', {
                  required: 'Description of the product is required.',
                })}
              />
            </FormRow>
            <FormRow label="Price" error={errors.price} htmlFor="price">
              <Input
                id="price"
                type="number"
                placeholder="Price of your product..."
                {...register('price', {
                  required: 'Price of the product is required.',
                  min: 0,
                  valueAsNumber: true,
                  onChange: (e) =>
                    setValue(
                      'price',
                      isNaN(e.target.valueAsNumber)
                        ? 0
                        : e.target.valueAsNumber,
                    ),
                })}
              />
            </FormRow>
            <FormRow label="Stock" error={errors?.stock} htmlFor={'stock'}>
              <Input
                id="stock"
                type="number"
                {...register('stock', {
                  required: 'Stock of the product is required.',
                  min: {
                    value: 1,
                    message: 'Products must have at least 1 stock.',
                  },
                  valueAsNumber: true,
                  onChange: (e) =>
                    setValue(
                      'stock',
                      isNaN(e.target.valueAsNumber)
                        ? 0
                        : e.target.valueAsNumber,
                    ),
                })}
              />
            </FormRow>
            {/* <CategorySelect control={control} categories={categories} /> */}
            <FormRow label="Category" error={errors?.category}>
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
            </FormRow>
            <FormRow label="Image" error={errors?.image}>
              <label
                htmlFor="image"
                className={`relative block h-[200px] w-[200px] cursor-pointer rounded-md border-2 border-dashed bg-transparent transition-colors hover:bg-accent-foreground/20 ${errors?.image ? 'border-destructive' : 'border-border'}`}
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
            </FormRow>
          </div>
          <DialogFooter>
            <Button type="submit" className="flex flex-row items-center gap-1">
              Save changes {isAdding && <Spinner className={'h-4 w-4'} />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
