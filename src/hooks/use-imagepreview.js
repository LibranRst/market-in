import { useEffect, useState } from 'react';

export default function useImagePreview(image) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image && image.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(image?.[0]);
      reader.onloadend = () => {
        if (imagePreview !== reader.result) {
          setImagePreview(reader.result);
        }
      };
    }
  }, [image, imagePreview]);

  return [imagePreview, setImagePreview];
}
