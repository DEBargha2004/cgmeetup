"use client";

import { CircularProgressbar } from "react-circular-progressbar";

export default function ProgressBar({ value = 0 }: { value?: number }) {
  return (
    <div className="w-full rounded bg-blue-500 flex justify-start items-start gap-2 p-4">
      <div>
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={{
            text: {
              fill: "white",
            },
            background: {
              backgroundColor: "red",
            },
            root: {
              height: "80px",
              width: "80px",
            },
            path: {
              stroke: "white",
            },
            trail: {
              stroke: "blue",
            },
          }}
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-xl font-bold">Profile Completed!</h1>
        <p className="font-medium text-sm">
          A complete profile increases the chances of a recruiter being more
          interested in recruiting you
        </p>
      </div>
    </div>
  );
}
