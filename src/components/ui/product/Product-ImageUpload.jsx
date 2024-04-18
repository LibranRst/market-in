const ProductImageUpload = ({ errors, imagePreview, register, mode }) => {
  return (
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
  );
};

export default ProductImageUpload;
