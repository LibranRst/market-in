import { useState } from 'react';

export const useCalculateReviews = () => {
  const [rating, setRating] = useState(0);
  const calculateRating = (reviews) => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      const averageRating = totalRating / reviews.length;
      setRating(averageRating.toFixed(1));
    } else {
      setRating(0);
    }
  };

  return {
    rating,
    calculateRating,
    setRating,
  };
};
