"use client";

import { forwardRef, HTMLProps } from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import StarRatings from "react-star-ratings";

export type RatingType = { maxCount: number; percent: number };

export function RatingInfo({ ratings }: { ratings: RatingType[] }) {
  return (
    <Table>
      <TableBody>
        {ratings.map(({ maxCount, percent }, index) => (
          <TableRow key={index} className="border-0">
            <TableCell className="py-2">
              <Rating rating={maxCount} />
            </TableCell>
            <TableCell className="py-2">
              <div className="w-[120px] h-4 bg-darkAccent relative">
                <div
                  className="absolute left-0 top-0 h-full bg-[#FFC125]"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </TableCell>
            <TableCell className="py-2">{percent}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const Rating = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof StarRatings>
>(({ rating, ...props }, ref) => {
  return (
    <div ref={ref}>
      <StarRatings
        numberOfStars={5}
        starDimension="20px"
        starSpacing="1px"
        rating={rating}
        starRatedColor="hsl(var(--golden))"
        starEmptyColor="hsl(var(--golden-foreground))"
        {...props}
      />
    </div>
  );
});

Rating.displayName = "Rating";
