"use client";

import React from "react";
import StarRatings from "react-star-ratings";

export default function StarRating(
  props: React.ComponentProps<typeof StarRatings>
) {
  return (
    <StarRatings
      starRatedColor="hsl(var(--golden))"
      starEmptyColor="hsl(var(--golden-foreground))"
      {...props}
    />
  );
}
