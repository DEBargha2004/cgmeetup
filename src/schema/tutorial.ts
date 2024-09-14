import { sub } from "date-fns";
import * as z from "zod";

const SectionType = z.enum(["text", "video"]);

const tutorialSchema = z.array(
  z.object({
    title: z.string({ required_error: "Title is required" }),
    img: z.string({ required_error: "Image is required" }),
    saved: z.boolean(),
    sections: z.array(
      z.object({
        lesson_id: z.string(),
        title: z.string({ required_error: "Title is required" }),
        type: SectionType,
        content: z.string({ required_error: "Content is required" })
      })
    )
  })
);

export const courseSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  visibility: z.string({ required_error: "Visibility is required" }),
  description: z.string({ required_error: "Description is required" }),
  requirements: z.string({ required_error: "Requirements is required" }),
  syllabus: z.string({ required_error: "Syllabus is required" }),
  category: z.string({ required_error: "Category is required" }),
  sub_category: z.string({ required_error: "Subcategory is required" }),
  skills: z.array(z.string()).min(1, "Skills are required"),
  software_used: z.array(z.string()).min(1, "Software used are required"),
  price: z.string({ required_error: "Price is required" }),
  language: z.string({ required_error: "Language is required" }),
  isFree: z.boolean(),
  hasAdultContent: z.boolean(),
  tags: z.array(z.string()).min(1, "Tags are required"),
  chapters: tutorialSchema
});

export type TutorialSchemaType = z.infer<typeof tutorialSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type SectionType = z.infer<typeof SectionType>;
