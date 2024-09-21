"use client";

import { CourseSchemaType } from "@/schema/tutorial";
import { createContext, useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type TSingleTutorialContext = {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
};

export const SingleTutorialContext =
  createContext<TSingleTutorialContext | null>(null);

export const useSingleTutorialContext = () => {
  const context = useContext(SingleTutorialContext);
  if (context === null) {
    throw new Error(
      "useSingleTutorialContext must be used within a SingleTutorialContextProvider"
    );
  }
  return context;
};
