import { RatingType } from "@/components/custom/rating-info";

export function calculateAverageStarRating(ratings: RatingType[]): number {
  let totalWeightedStars = 0;
  let totalPercentage = 0;

  ratings.forEach(({ maxCount, percent }) => {
    totalWeightedStars += maxCount * percent;
    totalPercentage += percent;
  });

  const averageRating = totalWeightedStars / totalPercentage;

  return averageRating;
}
