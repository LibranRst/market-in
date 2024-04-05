import { useEffect, useState } from 'react';

export default function useImagePreview(image, initialValue = null) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialValue && !image && imagePreview !== initialValue) {
      setImagePreview(initialValue);
      return
    }
    if (image && image.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(image?.[0]);
      reader.onloadend = () => {
        if (imagePreview !== reader.result) {
          setImagePreview(reader.result);
        }
      };
    }
  }, [image, imagePreview, initialValue]);

  return [imagePreview, setImagePreview];
}
