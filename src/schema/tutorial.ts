import { sub } from "date-fns";
import * as z from "zod";

const ContentType = z.enum(["text", "video", "iframe", "image"]);

const chaptersSchema = z.array(
  z.object({
    chapter_id: z.string(),
    title: z.string({ required_error: "Title is required" }),
    img: z.string({ required_error: "Image is required" }),
    saved: z.boolean()
  })
);

const lessonContentSchema = z.object({
  type: ContentType,
  content_id: z.string(),
  content: z.string()
});

const lessonsSchema = z.array(
  z.object({
    chapter_id: z.string(),
    lesson_id: z.string(),
    title: z.string({ required_error: "Title is required" }),
    saved: z.boolean(),
    is_free: z.boolean(),
    contents: z.array(lessonContentSchema)
  })
);

const tutorialSchema = z.object({
  tutorial_id: z.string(),
  title: z.string({ required_error: "Title is required" }),
  saved: z.boolean(),
  is_free: z.boolean(),
  contents: z.array(lessonContentSchema)
});

export const courseSchema = z
  .object({
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
    isCouse: z.boolean(),
    chapters: chaptersSchema,
    lessons: lessonsSchema,
    tutorial: tutorialSchema
  })
  .refine((data) => {
    if (data.isCouse) {
      return data.chapters.length > 0;
    }
  });

export type ChaptersSchemaType = z.infer<typeof chaptersSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type LessonsSchemaType = z.infer<typeof lessonsSchema>;
export type ContentType = z.infer<typeof ContentType>;
export type LessonContentSchemaType = z.infer<typeof lessonContentSchema>;
