"use client";

import { CourseSchemaType } from "@/schema/tutorial";
import { createContext, useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type TCurriculumContext = {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
  chapters: ReturnType<
    typeof useFieldArray<CourseSchemaType, "chapters", "id">
  >;
  lessons: ReturnType<typeof useFieldArray<CourseSchemaType, "lessons", "id">>;
};

export const CurriculumContext = createContext<TCurriculumContext | null>(null);

export const useCurriculum = () => {
  const context = useContext(CurriculumContext);

  if (!context) {
    throw new Error("useCurriculum must be used within a CurriculumProvider");
  }

  return context;
};
